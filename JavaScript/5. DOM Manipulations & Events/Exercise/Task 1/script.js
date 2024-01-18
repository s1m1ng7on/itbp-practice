function create(words) {
    const contentDivElement = document.getElementById('content');

    const createSection = (word) => {
        const sectionDivElement = document.createElement('div');
        const sectionParagraphElement = document.createElement('p');
        sectionParagraphElement.textContent = word;
        sectionParagraphElement.style.display = 'none';

        sectionDivElement.appendChild(sectionParagraphElement);
        sectionDivElement.addEventListener('click', handleDisplayHiddenParagraph);
        
        return sectionDivElement;
    };

    const handleDisplayHiddenParagraph = (e) => {
        if (e.currentTarget.getElementsByTagName('p')[0].style.display === 'none') {
            e.currentTarget.getElementsByTagName('p')[0].style.display = '';
        } else {
            e.currentTarget.getElementsByTagName('p')[0].style.display = 'none';
        }
    };

    words.forEach((word) => {
        const sectionDivElement = createSection(word);
        contentDivElement.appendChild(sectionDivElement);
    })
}