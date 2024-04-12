import { render } from './templateEngine.js';

async function start() {
    const articlesData = await (await fetch('./data.json')).json();
    await render('article', articlesData);
}

start();