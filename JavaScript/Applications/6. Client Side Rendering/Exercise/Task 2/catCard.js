import { html } from 'https://esm.run/lit-html@1';

export const catCard = (props) => html`
    <img src="./images/${props.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${onShowButtonClick}>Show status code</button>
        <div class="status" style="display: none" id="${props.statusCode}">
            <h4>Status Code: ${props.statusCode}</h4>
            <p>${props.statusMessage}</p>
        </div>
    </div>
`;

function onShowButtonClick(e) {
    const catStatusDivElement = e.currentTarget.parentNode.querySelector('.status');
    
    if (catStatusDivElement.style.display === 'none') {
        e.currentTarget.textContent = 'Hide status code';
        catStatusDivElement.style.display = 'inline';
    } else {
        e.currentTarget.textContent = 'Show status code';
        catStatusDivElement.style.display = 'none';
    }
}