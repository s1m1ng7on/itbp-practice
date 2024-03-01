function lockedProfile() {
    const mainElement = document.querySelector('#main');

    mainElement.innerHTML = '';

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            else return response.json();
        })
        .then(profiles => {
            Object.values(profiles).forEach(profile => {
                mainElement.innerHTML += `<div class="profile">
				    <img src="./iconProfile2.png" class="userIcon" />
				    <label>Lock</label>
				    <input type="radio" name="user1Locked" value="lock" checked>
				    <label>Unlock</label>
				    <input type="radio" name="user1Locked" value="unlock"><br>
				    <hr>
				    <label>Username</label>
				    <input type="text" name="user1Username" value="${profile.username}" disabled readonly />
				    <div class="hiddenInfo">
				    	<hr>
				    	<label>Email:</label>
				    	<input type="email" name="user1Email" value="${profile.email}" disabled readonly />
				    	<label>Age:</label>
				    	<input type="email" name="user1Age" value="${profile.age}" disabled readonly />
				    </div>
                    <button>Show more</button>`;
            });
        })
        .catch(error => {
            console.log(error);
        });
    
    mainElement.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.parentNode.querySelector('input[value="unlock"]').checked) {
            const profileHiddenInfoInputAndDivElements = e.target.parentNode.querySelectorAll('.hiddenInfo > input, .hiddenInfo > label');
            const profileHiddenInfoButtonElement = e.target.parentNode.querySelector('button');

            profileHiddenInfoInputAndDivElements.forEach(profileHiddenInfoInputOrDivElement => {
                if (profileHiddenInfoInputOrDivElement.style.display === 'block') {
                    profileHiddenInfoInputOrDivElement.style.display = 'none';
                    profileHiddenInfoButtonElement.textContent = 'Show more';
                } else {
                    profileHiddenInfoInputOrDivElement.style.display = 'block';
                    profileHiddenInfoButtonElement.textContent = 'Hide it';
                }
            });
        }
    });
}