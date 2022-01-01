import API from "../api/apiUtils";

const formApi = {
    getAll: () => {
        const url = '/sample.json';
        return API.get(url);
    }
}

export default formApi;
