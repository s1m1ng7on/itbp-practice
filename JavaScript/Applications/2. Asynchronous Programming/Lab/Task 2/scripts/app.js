function loadRepos() {
    const reposUlElement = document.querySelector('#repos');
    reposUlElement.innerHTML = '';

	const username = document.querySelector('#username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`${response.status} ${response.statusText}`);
			}
			return response.json();
		})
		.then(data => handleResponse(data))
		.catch(error => console.log(error));

    function handleResponse(data) {
        data.forEach(item => {
            const newItemLiElement = document.createElement('li');
            const newItemAElement = document.createElement('a');

            newItemAElement.textContent = item.full_name;
            newItemAElement.href = item.html_url;
            
            newItemLiElement.appendChild(newItemAElement);
            reposUlElement.appendChild(newItemLiElement);
        });
    }
}