import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Steps, TextArea, Toast } from 'antd-mobile';
import moment from 'moment';
import { useAppContext } from '@utils/context';
import TButton from '@components/TButton';
import Header from '@components/Header';
import { createComment } from '@services/comment';
import { useGoTo } from '@utils/hooks';

import style from './index.module.scss';

const { Step } = Steps;

// 默認數據
const defaultTweet = {
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
      created_at: '2021-12-22T15:03:52.6620522', // 該評論的創建時間
      likes_count: 0, // 該評論點讚數
      has_liked: false, // 當前登錄的用戶是否點讚了這個評論, true: 當前登錄的用戶點讚了這條評論, false: 當前登錄的用戶沒有點讚這條評論
    },
  ], // 該推文的評論集
  created_at: '2021-12-18T07:38:01.699129Z', // 該推文的創建時間
  content: 'This is a test, This is a test, This is a test, This is a test, This is a test This is a test, This is a test, This is a test, This is a test,', // 該推文的文本內容
  likes: [], // 哪寫用戶點讚了這條推文
  likes_count: 0, // 該推文的點讚數
  comments_count: 1, // 該推文的評論數
  has_liked: false, // 當前登錄的用戶是否點讚了這條推文, true: 當前登錄的用戶點讚了這條推文, false: 當前登錄的用戶沒有點讚這條推文
  photo_urls: ['https://telegraph-image-657.pages.dev/file/313b5e9c02dbbbcdcc511.jpg',
    'https://telegraph-image-657.pages.dev/file/d6476357b4207c1f32fde.jpg',
    'https://telegraph-image-657.pages.dev/file/2681eff049854d32e7b65.jpg',
    'https://telegraph-image-657.pages.dev/file/490c80df6b1a0bf13901b.jpg',
  ], // 該貼文的圖片地址集
};

/**
* 評論功能
*/
const Comment = () => {
  const [store] = useAppContext();
  // useState裡要放defaultTweet,否則受useEffect後初始化才有值,就會報錯
  const [data, setData] = useState(defaultTweet);
  const [text, setText] = useState('');
  const params = useParams();
  const go = useGoTo();
  useEffect(() => {
    setData(defaultTweet);
  }, []);

  const onClickReply = () => {
    createComment({
      content: text,
      tweet_id: params.id,
    }).then((res) => {
      if (res?.success) {
        Toast.show('回覆成功');
        go();
        return;
      }
      Toast.show('回覆失敗');
    });
  };

  const onChangeText = (v) => {
    setText(v);
  };

  return (
    <div className={style.container}>
      <Header>
        <TButton disabled={text.length === 0} onClick={onClickReply}>回覆</TButton>
      </Header>
      <Steps
        direction="vertical"
      >
        <Step
          icon={<img className={style.icon} src={data.user.avatar_url} alt="" />}
          title={(
            <div className={style.stepContent}>
              <div className={style.header}>
                <span className={style.nickname}>{data.user.nickname}</span>
                @
                <span className={style.username}>
                  {data.user.username}
                &nbsp;·&nbsp;
                  {moment(data.created_at).format('MM月DD日')}
                </span>
              </div>
              <div className={style.content}>
                {data.content}
              </div>
              <div className={style.recommit}>
                回覆
                <span className={style.commitName}>
                  @
                  {data.user.username}
                </span>
              </div>
            </div>
        )}
        />
        <Step
          icon={<img className={style.icon} src={store.user?.avatar_url} alt="" />}
          // icon={<img className={style.icon} src="https://telegraph-image-eqg.pages.dev/file/6e68d92a7ac0332aa2c94.jpg" alt="" />}
          title={(
            <div>
              <TextArea value={text} onChange={onChangeText} className={style.text} placeholder="發布你的回覆" />
            </div>
          )}
        />
      </Steps>
    </div>
  );
};

export default Comment;
