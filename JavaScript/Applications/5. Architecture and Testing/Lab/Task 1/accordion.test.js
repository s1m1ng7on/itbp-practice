import { chromium } from 'playwright-chromium';
//import { assert } from 'chai';

const browser = await chromium.launch();
const newPage = await chromium.newPage();
await newPage.goto('https://127.0.0.1/5500');
await newPage.screenshot({ path: 'example.png' });
await browser.close();