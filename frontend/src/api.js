import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // Remplacez par l'URL de votre serveur Express
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    authenticate() {
        return apiClient.post('/api/auth');
    },
};
