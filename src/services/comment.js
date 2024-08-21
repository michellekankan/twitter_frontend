import { post } from '../utils/request';

// 創建評論
export const createComment = (params) => post('/api/comments', params);

// 點贊接口
export const likes = (params) => post('/api/likes', params);

// 取消點讚
export const cancelLike = (params) => post('/api/likes/cancel', params);
