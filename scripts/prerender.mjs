// scripts/prerender.mjs
//
// Runs AFTER `npm run build`. Starts a local static server for the built
// `dist/` folder, visits each route in a headless browser, waits for
// React to render, then overwrites dist/<route>/index.html with the
// fully-rendered HTML (real text, not an empty <div id="root">).
//
// Uses puppeteer-core + @sparticuz/chromium so it works inside Vercel's
// build container (which is missing system libs full puppeteer needs).
// Falls back to your local Chrome/Chromium install when run on your
// own machine, so `npm run build` still works locally too.

import { createServer } from 'http';
import handler from 'serve-handler';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
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

// Common local Chrome paths (macOS / Linux / Windows) used only when
// NOT running on Vercel, so local builds still work.
function findLocalChrome() {
    const candidates = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    ];
    return candidates.find((p) => fs.existsSync(p));
}

async function getBrowser() {
    const isVercel = !!process.env.VERCEL;

    if (isVercel) {
        // Serverless-compatible Chromium binary
        return puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
    }

    // Local dev: use your installed Chrome
    const localPath = findLocalChrome();
    if (!localPath) {
        throw new Error(
            'No local Chrome found. Install Google Chrome, or run this build on Vercel where @sparticuz/chromium is used automatically.'
        );
    }
    return puppeteer.launch({
        executablePath: localPath,
        headless: true,
    });
}

async function main() {
    // 1. Serve the built dist/ folder locally
    const server = createServer((req, res) =>
        handler(req, res, { public: distDir })
    );
    await new Promise((resolve) => server.listen(PORT, resolve));
    console.log(`Serving dist/ at http://localhost:${PORT}`);

    // 2. Launch headless browser (env-aware)
    const browser = await getBrowser();

    for (const route of ROUTES) {
        const page = await browser.newPage();
        const url = `http://localhost:${PORT}${route}`;
        console.log(`Prerendering ${url} ...`);

        await page.goto(url, { waitUntil: 'networkidle0' });

        // If your app has async data fetching, give it a moment to settle.
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
