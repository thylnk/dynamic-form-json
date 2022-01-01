import axios from "axios";

const instance = axios.create({
    baseURL: 'https://gist.githubusercontent.com/bittermeatball/7854f3d7950469b0203a068fcaf27908/raw/1de87462c4f8c2fd0bfb9d452b246c92697b2eee',
});

instance.interceptors.response.use((response) => {
    if (response && response.data) {
        // vi luon can tra ve response.data
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default instance;