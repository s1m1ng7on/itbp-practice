import { townsList } from './townsList.js';
import { render } from 'https://esm.run/lit-html@1';

const townsListDivElement = document.querySelector('#root');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const townsUlElement = townsList(new FormData(e.currentTarget).get('towns').split(', '));
    render(townsUlElement, townsListDivElement);
});