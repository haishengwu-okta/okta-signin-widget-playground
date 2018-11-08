import axios from 'axios';

const MOCK_API_SERVER = 'http://localhost:8080';

const save = async (config) => {

    try {
        const response = axios.post(`${MOCK_API_SERVER}/config`, {
            config,
        });
        console.log('saved API config', response);
    } catch (error) {
        console.log('API config error', error);
    }

}

export { save };
