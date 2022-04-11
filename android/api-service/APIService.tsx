import axios from 'axios';

const APIService = {
  get(url: string, params?: any) {
    return axios.get(url, params);
  },
};

export default APIService;
