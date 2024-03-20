function attachEvents() {
    const loadPostsButtonElement = document.querySelector('#btnLoadPosts');
    const viewPostButtonElement = document.querySelector('#btnViewPost');

    const postsSelectElement = document.querySelector('#posts');
    const postTitleH1Element = document.querySelector('#post-title');
    const postBodyPElement = document.querySelector('#post-body');
    const postCommentsUlElement = document.querySelector('#post-comments');

    loadPostsButtonElement.addEventListener('click', () => {
        postsSelectElement.innerHTML = '';

        fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(posts => {
                Object.values(posts).forEach(post => {
                    const postOptionElement = document.createElement('option');
                    postOptionElement.textContent = post.title.toUpperCase();
                    postOptionElement.value = post.id;
                    postsSelectElement.appendChild(postOptionElement);
                });
            })
            .catch(error => {
                console.log(error);
            });

        postsSelectElement.selectedIndex = 0;
    });

    viewPostButtonElement.addEventListener('click', () => {
        postCommentsUlElement.innerHTML = '';

        const selectedPostId = postsSelectElement.value;
        let selectedPost;

        fetch('http://localhost:3030/jsonstore/blog/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(posts => {
                selectedPost = Object.values(posts).find(post => post.id === selectedPostId);

                postTitleH1Element.textContent = selectedPost.title;
                postBodyPElement.textContent = selectedPost.body;
            })
            .catch(error => {
                console.log(error);
            });

        fetch('http://localhost:3030/jsonstore/blog/comments')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(allComments => {
                const postComments = Object.values(allComments).filter(comment => comment.postId === selectedPostId);
                postComments.forEach(postComment => {
                    const postCommentLiElement = document.createElement('li');
                    postCommentLiElement.id = postComment.id;
                    postCommentLiElement.textContent = postComment.text;
                    postCommentsUlElement.appendChild(postCommentLiElement);
                });
            })
            .catch(error => {
                console.log(error);
            });
    });
}

attachEvents();