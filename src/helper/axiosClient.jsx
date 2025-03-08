import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

// Create an Axios instance with custom headers
const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        // You can add other headers here if needed
    },
});
export const getRequest = async (url) => {
    return await instance.get(url).then(response => response)
};

//We can add other HTTP method here
