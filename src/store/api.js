import axios from 'axios';

const instance = axios.create({
  baseURL: '',
});

const ThreadsApi = '/list';
export const getThreads = () => instance.get(ThreadsApi);
export const testPost = () => instance.post(ThreadsApi);
