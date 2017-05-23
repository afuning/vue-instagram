import axios from 'axios';

const instance = axios.create({
  baseURL: '',
});

const ListApi = '/list';
export const getList = () => instance.get(ListApi);
export const testPost = () => instance.post(ListApi);
