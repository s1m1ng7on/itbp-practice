import { html, render } from 'https://esm.run/lit-html@1';

async function start() {
    const articlesData = await (await fetch('./data.json')).json();
    const mainElement = document.querySelector('main');

    const articles = articlesData.map(a => html`
        <article>
            <h3>${a.title}</h3>
            <div class="content-body">
                <p>${a.content}</p>
            </div>
            <footer>Author: ${a.author}</footer>
        </article>`
    );

    render(articles, mainElement);
}

start();