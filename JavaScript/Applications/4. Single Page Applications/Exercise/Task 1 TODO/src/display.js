const topicContainerDivElement = document.querySelector('.topic-container');

/* let currentView = null;

export function loadView(id) {
    const selectedView = document.querySelector(`#${id}`);
    if (selectedView && selectedView.tagName === 'SECTION') {
        hideView(currentView);
        currentView = selectedView;
        currentView.style.display = 'block';
    } else {
        throw new Error(`A view with ${id} was not found.`);
    }
}

function hideView(view) {
    if (view) {
        view.style.display = 'none';
    }
}
 */
export function displayPosts(posts) {
    posts.forEach(post => {
        topicContainerDivElement.innerHTML += `<div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal">
                <h2>${post.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${post.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${post.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    });
}