function getArticleGenerator(articles) {
    const contentDivElement = document.querySelector('#content');

    let currentArticleIndex = 0;
    return function() {
        if (currentArticleIndex < articles.length) {
            const newArticleElement = document.createElement('article');
            newArticleElement.textContent = articles[currentArticleIndex];
            contentDivElement.appendChild(newArticleElement);
            currentArticleIndex++;    
        }
    }
}
