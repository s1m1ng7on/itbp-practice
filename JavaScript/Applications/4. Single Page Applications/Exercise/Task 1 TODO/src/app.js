import { loadTopics, postNewTopic } from "./topics.js";
import { displayPosts } from "./display.js";

displayPosts(await loadTopics());

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get('topicName');
    const username = formData.get('username');
    const post = formData.get('postText');

    await postNewTopic(title, username, post);

    e.target.reset();
    
    displayPosts(await loadTopics());
});