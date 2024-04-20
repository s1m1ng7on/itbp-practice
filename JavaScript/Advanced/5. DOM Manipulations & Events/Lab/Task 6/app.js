function validate() {
    const emailInputElement = document.getElementById('email');
    emailInputElement.addEventListener('change', (e) => {
        if (e.currentTarget.value.match(/[a-z]*\@[a-z]*\.[a-z]*/g)) {
            emailInputElement.classList.remove('error');
        } else {
            emailInputElement.classList.add('error'); 
        }
    }); 
}