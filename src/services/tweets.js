import { post, get } from '../utils/request';

// 發文
export const createTweet = (params) => post('/api/tweets', params);

export const getTweets = (id) => get('/api/tweets/', {
  user_id: id,
});

// 獲取Feeds數據
export const getFeeds = () => get('/api/newsfeeds/').then((res) => {
  if (res.data && res.data.length > 0) {
    return res.data.map((item) => ({ ...item.tweet }));
  }
  return [];
});
// 後面用.then取出res.data裡的tweet是為了配合tweetcard等大頭貼/使用者取法 datasource.user.username
