export const contactCard = (props) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: Merrie</h2>
        <button class="detailsBtn" onclick="showDetails(2)">Details</button>
        <div class="details" id="2" style="display: none;">
            <p>Phone number: 0845996111</p>
            <p>Email: merrie@merrie.com</p>
        </div>
    </div>
</div>`;