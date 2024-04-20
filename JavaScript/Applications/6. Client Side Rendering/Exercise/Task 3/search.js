import { render } from 'https://esm.run/lit-html@1';
import { townsList } from './townsList.js';

function search() {
    const townsUl = townsList();
    const townsDivElement = document.querySelector('#towns');

    const searchTownsTextInputElement = document.querySelector('#searchText');
    const searchTownsButtonElement = document.querySelector('button');
    const searchTownsResultDivElement = document.querySelector('#result');

    render(townsUl, townsDivElement);

    searchTownsButtonElement.addEventListener('click', () => {
        const townsUlElement = document.querySelector('ul');
    });
}

search();