import { post } from '@utils/request';

// eslint-disable-next-line import/prefer-default-export
export const registerUser = (params) => post('/api/accounts/signup', params);
