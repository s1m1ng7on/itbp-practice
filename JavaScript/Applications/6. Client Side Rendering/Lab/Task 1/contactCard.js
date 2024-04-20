import { html } from 'https://esm.run/lit-html@1';

export const contactCard = (props) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${props.name}</h2>
        <button class="detailsBtn" @click=${onDetailsClick}>Details</button>
        <div class="details" style="display: none;">
            <p>Phone number: ${props.phoneNumber}</p>
            <p>Email: ${props.email}</p>
        </div>
    </div>
</div>`;

function onDetailsClick(e) {
    const currentContactCardDetailsDivElement = e.currentTarget.parentNode.querySelector('.details');

    if (currentContactCardDetailsDivElement.style.display === 'none') {
        currentContactCardDetailsDivElement.style.display = 'inline';
    } else {
        currentContactCardDetailsDivElement.style.display = 'none';
    }
}