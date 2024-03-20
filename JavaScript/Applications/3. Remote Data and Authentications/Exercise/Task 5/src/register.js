window.addEventListener('DOMContentLoaded', () => {
    const registerFormElement = document.querySelector('form');

    registerFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPassword = formData.get('rePass');

        if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) && password === repeatPassword) {
            await register(email, password);
        }
    });
});

async function register(email, password) {
    const response = await fetch('http:localhost:3030/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            email,
            password
        })
    });

    if (response.ok) {
        console.log("REGISTER SUCCESSFULLY");
    } else {
        console.log("ERROR");
    }
}