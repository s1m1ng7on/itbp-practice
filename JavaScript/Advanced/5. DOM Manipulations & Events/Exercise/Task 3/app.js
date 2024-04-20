function lockedProfile() {
    function toggleProfile(e) {
        const profileDivElement = e.target.parentNode;
        const checkedUserLockOption = profileDivElement.querySelector('input[type="radio"]:checked').value;
        const userHiddenFieldsDivElement = profileDivElement.querySelector('div');
    
        if (checkedUserLockOption === 'unlock') {
            if (userHiddenFieldsDivElement.style.display === 'none') {
                userHiddenFieldsDivElement.style.display = 'inline';
                e.target.textContent = 'Hide it';
            } else {
                userHiddenFieldsDivElement.style.display = 'none';
                e.target.textContent = 'Show more';
            }
        }
    }

    const mainDivElement = document.getElementById('main');
    mainDivElement.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            toggleProfile(e);
        }
    });
}