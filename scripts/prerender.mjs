// scripts/prerender.mjs
//
// Runs AFTER `bun run build`. Starts a local static server for the built
// `dist/` folder, visits each route in a headless browser, waits for
// React to render, then overwrites dist/<route>/index.html with the
// fully-rendered HTML (real text, not an empty <div id="root">).
//
// Usage: node scripts/prerender.mjs

import { createServer } from 'http';
import handler from 'serve-handler';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const PORT = 4173;

// Add every route your site has. For a single-page portfolio this is
// probably just "/". If you add routes like /projects or /about later,
// list them here too.
const ROUTES = ['/'];

async function main() {
    // 1. Serve the built dist/ folder locally
    const server = createServer((req, res) =>
        handler(req, res, { public: distDir })
    );
    await new Promise((resolve) => server.listen(PORT, resolve));
    console.log(`Serving dist/ at http://localhost:${PORT}`);

    // 2. Launch headless browser
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const route of ROUTES) {
        const page = await browser.newPage();
        const url = `http://localhost:${PORT}${route}`;
        console.log(`Prerendering ${url} ...`);

        await page.goto(url, { waitUntil: 'networkidle0' });

        // If your app has async data fetching, give it a moment to settle.
        // Prefer waiting for a specific selector that only appears once
        // your content has rendered, e.g.:
        // await page.waitForSelector('#root h1', { timeout: 10000 });
        await new Promise((r) => setTimeout(r, 500));

        const html = await page.content();

        const outDir =
            route === '/' ? distDir : path.join(distDir, route.slice(1));
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');

        console.log(`Wrote ${path.join(outDir, 'index.html')}`);
        await page.close();
    }

    await browser.close();
    server.close();
    console.log('Prerendering complete.');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});