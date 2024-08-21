import { useState, useEffect } from 'react';
import moment from 'moment';
import Header from '@components/Header';
import ImageCard from '@components/ImageCard';
import Bar from '@components/Bar';
import CommentCard from '@components/CommentCard';
import { OBJECT_KEYS } from '@components/Bar/constants';
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
        nickname: 'adminbaby', // 發送該評論的用戶暱稱
        avatar_url: 'https://telegraph-image-55i.pages.dev/file/e60b076ea41e5ba4c5865.png', // 發送該評論的用戶頭像地址
      }, // 發送該評論的用戶信息
      content: 'Test!', // 該評論的文本內容
      created_at: '2021-12-22T15:03:52.662052Z', // 该评论的创建时间
      likes_count: 10, // 该评论点赞数
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
* 單個推文
*/
const Tweet = () => {
  const [data, setData] = useState(tweet);
  useEffect(() => {
    setData(tweet);
  }, []);
  return (
    <div className={style.container}>
      <Header />
      <div className={style.contentContainer}>
        <div className={style.header}>
          <img src={data.user.avatar_url} alt="" className={style.avatar} />
          <div className={style.right}>
            <div className={style.nickname}>
              {data.user.nickname}
            </div>
            <div className={style.userName}>
              @
              {data.user.username}
            </div>
          </div>
        </div>
        <div className={style.content}>
          {data.content}
        </div>
        <div className={style.photo}>
          <ImageCard
            imgs={data.photo_urls}
            likesCount={data.likes_count}
            commentsCount={data.comments_count}
          />
        </div>
      </div>
      <div className={style.timeline}>
        {moment(data.created_at).format('A h:m ． YYYY年M月D日')}
        &nbsp;． Twitter for iPhone
      </div>
      <div className={style.bar}>
        <Bar
          commentsCount={data.comments_count}
          likesCount={data.likes_count}
          id={data.id}
          type={OBJECT_KEYS.TWEET}
        />
      </div>
      {data.comments.map((item) => (<CommentCard key={item.id} data={item} />))}
    </div>
  );
};

export default Tweet;
