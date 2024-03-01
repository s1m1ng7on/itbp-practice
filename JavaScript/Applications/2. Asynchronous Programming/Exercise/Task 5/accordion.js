function solution() {
    const mainSectionElement = document.querySelector('#main');

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then (response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(articles => {
            articles.forEach(article => {
                fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`${response.status} ${response.statusText}`);
                        }
                        return response.json();            
                    })
                    .then(articleData => {
                        console.log(articleData);
                        mainSectionElement.innerHTML += `<div class="accordion">
                            <div class="head">
                                <span>${articleData.title}</span>
                                <button class="button" id="${articleData._id}">More</button>
                            </div>
                            <div class="extra">
                                <p>${articleData.content}</p>
                            </div>
                        </div>`;
                    });
            });
        });
    
    mainSectionElement.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const articleExtraContentDivElement = e.target.parentNode.parentNode.querySelector('.extra');
            if (e.target.textContent === 'More') {
                articleExtraContentDivElement.style.display = 'block';
                e.target.textContent = 'Less';
            } else if (e.target.textContent === 'Less') {
                articleExtraContentDivElement.style.display = 'none';
                e.target.textContent = 'More';
            }
        }
    });
}

solution();