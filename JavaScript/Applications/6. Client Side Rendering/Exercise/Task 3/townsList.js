import { html } from 'https://esm.run/lit-html@1';
import { towns } from './towns.js';

export const townsList = () => html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>
`;