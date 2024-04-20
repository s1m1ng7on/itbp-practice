import { cats } from './catSeeder.js';
import { catCard } from './catCard.js';
import { html, render } from 'https://esm.run/lit-html@1';

render(html`
    <ul>
        ${cats.map(cat => html`<li>${catCard(cat)}</li>`)}
    </ul>
`, document.querySelector('#allCats'));