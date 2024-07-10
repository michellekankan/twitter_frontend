import { useState, useEffect } from 'react';
import TweetCard from '@components/TweetCard';
import style from './index.module.scss';

/**
* 主頁推文
*/
const Tweets = () => {
  const [data, setData] = useState();
  useEffect(() => {
    console.log('data', data);
    setData([]);
  }, []);
  return (
    <div className={style.container}>
      <TweetCard />
    </div>
  );
};

export default Tweets;
