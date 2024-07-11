import { useState, useEffect } from 'react';
import moment from 'moment';
import ImageCard from '@components/ImageCard';
import Bar from '@components/Bar';

import style from './index.module.scss';

const tweet = {
  id: 1, // 推文id
  user: {
    id: 2, // 發送該推文的用戶
    username: 'michelle', // 發送該推文的用戶名
    nickname: 'michelleabc', // 發送該推文的用戶暱稱
    avatar_url: 'https://telegraph-image-dbq.pages.dev/file/c5c3ebf78d270c5c67af9.jpg', // 發送該推文的用戶頭像地址
  }, // 發送該推文的用戶信息
  comments: [
    {
      id: 1, // 評論id
      tweet_id: 1, // 評論的推文id
      user: {
        id: 1, // 發送該評論的用戶
        username: 'admin', // 發送該評論的用戶名
        nickname: null, // 發送該評論的用戶暱稱
        avatar_url: null, // 發送該評論的用戶頭像地址
      }, // 發送該評論的用戶信息
      content: 'Test!', // 該評論的文本內容
      created_at: 0, // 該評論點讚數
      has_liked: false, // 當前登錄的用戶是否點讚了這個評論, true: 當前登錄的用戶點讚了這條評論, false: 當前登錄的用戶沒有點讚這條評論
    },
  ], // 該推文的評論集
  created_at: '2021-12-18T07:38:01.699129Z', // 該推文的創建時間
  content: 'Id valus are not mutable. Any id value in the body of your PUT or PATCH request will be ignored. Only a value set in a Post request will be respected, but only if not already taken.', // 該推文的文本內容
  likes: [], // 哪寫用戶點讚了這條推文
  likes_count: 10, // 該推文的點讚數
  comments_count: 1, // 該推文的評論數
  has_liked: false, // 當前登錄的用戶是否點讚了這條推文, true: 當前登錄的用戶點讚了這條推文, false: 當前登錄的用戶沒有點讚這條推文
  photo_urls: ['https://telegraph-image-657.pages.dev/file/313b5e9c02dbbbcdcc511.jpg',
    'https://telegraph-image-657.pages.dev/file/d6476357b4207c1f32fde.jpg',
    'https://telegraph-image-657.pages.dev/file/2681eff049854d32e7b65.jpg',
    'https://telegraph-image-657.pages.dev/file/490c80df6b1a0bf13901b.jpg',
  ], // 該貼文的圖片地址集
};

/**
* 推文card
*/
const TweetCard = () => {
  const [data, setData] = useState();
  useEffect(() => {
    console.log('data', data);
    setData([]);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.avatarContainer}>
        <img src={tweet.user.avatar_url} alt="頭像" className={style.avatar} />
      </div>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <span className={style.nickname}>
            {tweet.user.nickname}
          </span>
          @
          <span className={style.username}>{tweet.user.username}</span>
          {/* 如果前面要空格不能直接空格 不然會報錯 */}
          &nbsp;·&nbsp;
          {moment(tweet.created_at).format('MM分鐘')}
        </div>
        <div className={style.content}>
          {tweet.content}
        </div>
        <div className={style.photo}>
          <ImageCard
            imgs={tweet.photo_urls}
            commentsCount={tweet.comments_count}
            likesCount={tweet.likes_count}
          />
        </div>
        <div className={style.bar}>
          <Bar commentsCount={tweet.comments_count} likesCount={tweet.likes_count} />
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
