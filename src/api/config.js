import axios from 'axios';
import Constants from '../util/Constants';

const save = async (config) => {

    try {
        const response = axios.post(`${Constants.MOCK_SERVER}/config`, {
            config,
        });
        console.log('saved API config', response);
    } catch (error) {
        console.log('API config error', error);
    }

};

export { save };
