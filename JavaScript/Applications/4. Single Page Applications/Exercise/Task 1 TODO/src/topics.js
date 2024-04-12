const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';

export async function loadTopics() {
    const response = await fetch(url);
    const data = await response.json();
    return Object.values(data);
}

export async function postNewTopic(title, username, post) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            username,
            post,
            date: new Date()
        })
    });
}

export async function getComments() {
    
}