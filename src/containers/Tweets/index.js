import { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  CellMeasurer, CellMeasurerCache, List, WindowScroller,
} from 'react-virtualized';
import { InfiniteScroll, PullToRefresh } from 'antd-mobile';
import TweetCard from '@components/TweetCard';
import { getFeeds } from '@services/tweets';
// import { usePullToRefresh, useDownLoad } from '@utils/hooks';
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

const tweet1 = {
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
  content: 'I am happy', // 該推文的文本內容
  likes: [], // 哪寫用戶點讚了這條推文
  likes_count: 10, // 該推文的點讚數
  comments_count: 1, // 該推文的評論數
  has_liked: false, // 當前登錄的用戶是否點讚了這條推文, true: 當前登錄的用戶點讚了這條推文, false: 當前登錄的用戶沒有點讚這條推文
  photo_urls: ['https://telegraph-image-657.pages.dev/file/313b5e9c02dbbbcdcc511.jpg',
    'https://telegraph-image-657.pages.dev/file/d6476357b4207c1f32fde.jpg',
  ], // 該貼文的圖片地址集
};

const defaultData = [];
for (let i = 0; i < 100; i += 1) {
  if (Math.random() < 0.5) {
    defaultData.push(tweet1);
  } else {
    defaultData.push(tweet);
  }
}
// 因為這是唯一的,所以把它移到Tweets外
const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 200,
});

const noRowRender = () => '加載中...';

/**
* 主頁推文
*/
const Tweets = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // const tip = usePullToRefresh();
  // const loading = useDouwnLoad();

  useEffect(() => {
    const init = async () => {
      const res = await getFeeds();
      setData(res);
    };
    init();
  }, []);

  const rowRenderer = ({
    key, style: sy, index, parent,
  }) => (
    <CellMeasurer
     // cache是做一個緩存 他的區域有多大? 也就是未加載之前有多少佔位
      cache={cache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ registerChild }) => (
        <div style={sy} key={key} ref={registerChild}>
          <TweetCard dataSource={data[index]} />
        </div>
      )}
    </CellMeasurer>
  );

  const handleLoadMore = async () => {
    const res = await getFeeds();
    setData((d) => [...d, ...res]);
    if (res.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <div className={style.container}>
      {/* 原本是自己些pullToRefresh功能並引入tip,但最終是直接使用antd-mobile的組件 */}
      {/* {tip} */}
      <PullToRefresh
        onRefresh={async () => {
          const res = await getFeeds();
          console.log('res', res);
          setData((d) => [...d, ...res]);
        }}
      >
        <WindowScroller>
          {({
            height, width, isScrolling, registerChild, onChildScroll, scrollTop,
          }) => (
            <div ref={registerChild}>
              <List
                autoHeight
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                overscanRowCount={2}
                noRowsRenderer={noRowRender}
                rowCount={data.length}
                rowRenderer={rowRenderer}
                width={width}
              />
            </div>
          )}
        </WindowScroller>
      </PullToRefresh>
      <div style={{ height: 50 }}>
        {/* 原本是自己寫useDownLoad並引入loading,但最終是直接使用antd-mobile的組件 */}
        {/* {loading && '加載中...'} */}
        <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
      </div>
    </div>
  );
};

export default Tweets;
