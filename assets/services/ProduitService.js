import axios from 'axios';
const url = 'https://localhost/api/';

export default {
    getProducts() {
        return axios
            .get(url + 'produits')
            .then((response) => {
                return response.data["hydra:member"];
            });
    }
};
