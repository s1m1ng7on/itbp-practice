import { html } from 'https://esm.run/lit-html@1';

export const townsList = (towns) => html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>
`;