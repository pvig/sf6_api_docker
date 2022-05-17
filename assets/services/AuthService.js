// src/services/AuthService.js
import axios from 'axios';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
const url = 'https://localhost/api/';

export default {
    login(credentials) {
        console.log("credentials", credentials);
        console.log("url", url + 'login_check');
        return axios
            .post(url + 'login_check', credentials)
            .then((response) => {
                let resp = Object.assign(credentials, response.data);
                console.log("resp", resp);
                return resp;
            });
    },
    signUp(credentials) {
        return axios
            .post(url + 'users', credentials)
            .then(response => response.data);
    },
    getSecretContent() {
        return axios.get(url + 'secret-route/').then(response => response.data);
    }
};