window.addEventListener('DOMContentLoaded', () => {
    const loginFormElement = document.querySelector('form');

    loginFormElement.addEventListener('submit', async(e) => {
        e.preventDefault();

        const loginFormData = new FormData(e.target);

        const email = loginFormData.get('email');
        const password = loginFormData.get('password');

        await login(email, password);
    });
});

async function login(email, password) {
    const response = await fetch('http://localhost:3030/users/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (response.ok) {
        const user = await response.json();

        sessionStorage.setItem('accessToken', user.accessToken);
        sessionStorage.setItem('_id', user._id);
    }
}