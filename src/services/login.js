import { get, post } from '../utils/request';

export const loginService = (username, password) => get(`/api/login/${username}/${password}`);

export const register = (username, password) => post(`/register/${username}/${password}`);
