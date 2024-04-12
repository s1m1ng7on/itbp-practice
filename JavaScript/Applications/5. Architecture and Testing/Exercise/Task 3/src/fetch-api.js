export let host;

async function request(endpoint, options) {
    try {
        const url = host + endpoint;

        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 403) {
                sessionStorage.removeItem('userData');
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (error) {
        alert(error);
        throw error;
    }
}

function createOptions(method = "GET", data) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        options.headers['X-Autorization'] = userData.token;
    }

    return options;
}

export async function get(endpoint) {
    return await request(endpoint, createOptions());
}

export async function post(endpoint, data) {
    return await request(endpoint, createOptions("POST", data));
}

export async function put(endpoint, data) {
    return await request(endpoint, createOptions("PUT", data));
}

export async function patch(endpoint, data) {
    return await request(endpoint, createOptions('PATCH', data));
}

export async function del(endpoint, data) {
    return await request(endpoint, createOptions('DELETE'));
}