import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Vite local dev middleware for Vercel Serverless Function simulation (/api/*)
const localApiPlugin = () => ({
  name: "local-api-middleware",
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url && req.url.startsWith("/api/")) {
        try {
          const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          const pathname = urlObj.pathname;

          let handlerFile = "";
          if (pathname === "/api/github-activity") {
            handlerFile = path.resolve(__dirname, "./api/github-activity.ts");
          } else if (pathname === "/api/github-contributions") {
            handlerFile = path.resolve(__dirname, "./api/github-contributions.ts");
          }

          if (handlerFile) {
            // Load environment variables from .env / .env.local
            const env = loadEnv(server.config.mode, process.cwd(), "");
            if (env.GITHUB_TOKEN) process.env.GITHUB_TOKEN = env.GITHUB_TOKEN;
            if (env.GITHUB_USERNAME) process.env.GITHUB_USERNAME = env.GITHUB_USERNAME;

            const mod = await server.ssrLoadModule(handlerFile);
            const handler = mod.default;

            const mockReq = {
              query: Object.fromEntries(urlObj.searchParams.entries()),
              headers: req.headers,
              method: req.method
            };

            const mockRes = {
              setHeader(name: string, value: string) {
                res.setHeader(name, value);
              },
              status(code: number) {
                res.statusCode = code;
                return mockRes;
              },
              json(data: any) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
              }
            };

            await handler(mockReq, mockRes);
            return;
          }
        } catch (err: any) {
          console.error("Local API Handler Error:", err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
          return;
        }
      }
      next();
    });
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    localApiPlugin(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.glb'],
}));
