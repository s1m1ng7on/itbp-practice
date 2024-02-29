function loadCommits() {
    const commitsUlElement = document.querySelector('#commits');
    commitsUlElement.innerHTML = '';

	const username = document.querySelector('#username').value;
    const repository = document.querySelector('#repo').value;
	const url = `https://api.github.com/repos/${username}/${repository}/commits`;

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
			return response.json();
		})
		.then(data => {
            data.forEach(item => {
                const newItemLiElement = document.createElement('li');
                newItemLiElement.textContent = `${item.commit.author.name}: ${item.commit.message}`;
                commitsUlElement.appendChild(newItemLiElement);
            });
        })
		.catch(error => {
            const errorLiElement = document.createElement('li');
            errorLiElement.textContent = error;
            commitsUlElement.appendChild(errorLiElement);
        });
}