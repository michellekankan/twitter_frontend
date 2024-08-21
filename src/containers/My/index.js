import { useState, useEffect } from 'react';
import { Button, Tabs } from 'antd-mobile';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { getTweets } from '@services/tweets';
import TweetCard from '@components/TweetCard';
import style from './index.module.scss';

/**
* 個人資料
*/
const My = () => {
  const [store] = useAppContext();
  const [data, setData] = useState([]);
  const go = useGoTo();
  useEffect(() => {
    const init = async () => {
      const res = await getTweets();
      setData(res.data);
    };
    init();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.header} />
      <img className={style.avatar} src={store.user?.avatar_url} alt="頭像" />
      <Button className={style.edit} onClick={() => go('editUser')}>更新個人資料</Button>
      <div className={style.nickname}>
        {store.user?.nickname || 'unknown'}
      </div>
      <div className={style.username}>
        @
        {store.user?.username}
      </div>
      <div className={style.follower}>
        <span className={style.number1}>
          100
        </span>
        正在關注
        <span className={style.number2}>
          200
        </span>
        關注者
      </div>
      <Tabs>
        <Tabs.Tab title="推文" key="tweet">
          {data.map((item) => <TweetCard key={item.id} dataSource={item} />)}
        </Tabs.Tab>
        <Tabs.Tab title="推文和回覆" key="reply">
          reply
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default My;
