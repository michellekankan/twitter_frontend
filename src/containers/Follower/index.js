import { Tabs } from 'antd-mobile';
import { useEffect, useState } from 'react';
import FollowerItem from '@components/FollowerItem';
import Header from '@components/Header';
import { getFollowers, getFollowings } from '@services/user';
import { useAppContext } from '@utils/context';

import style from './index.module.scss';

const TYPE = {
  FOLLOWER: {
    key: 'follower',
    title: '關注者',
  },
  FOLLOWING: {
    key: 'following',
    title: '正在關注',
  },
};
/**
* 我的粉絲和關注
*/
const Follower = () => {
  const [data, setData] = useState([]);
  const [store] = useAppContext();
  // const [hasFollowed, setHasFollowed] = useState();

  useEffect(() => {
    if (store.user && store.user.id) {
      const init = async () => {
        const res = await getFollowers(store.user.id);
        setData(res.data);
      };
      init();
    }
  }, [store.user]);

  const handleFollow = async (id) => {
    const res = await getFollowers(id);
    if (res.success) {
      setData((d) => d.map((i) => (i.user.id === id ? { ...i, has_followed: true } : i)));
    }
  };

  const handleCancelFollow = () => {
    // TODO: 取消关注
  };

  const onTabsChange = async (key) => {
    if (key === TYPE.FOLLOWER.key) {
      const res = await getFollowers(store.user.id);
      setData(res.data);
    }
    if (key === TYPE.FOLLOWING.key) {
      const res = await getFollowings(store.user.id);
      setData(res.data);
    }
  };
  return (
    <div className={style.container}>
      <Header title={store.user?.nickname || 'no known'} />
      <Tabs onChange={onTabsChange}>
        {Object.values(TYPE).map((item) => (
          <Tabs.Tab title={item.title} key={item.key}>
            {data.map((it) => (
              <FollowerItem
                key={it.user.id}
                avatarUrl={it.user.avatar_url}
                nickname={it.user.nickname}
                username={it.user.username}
                hasFollowed={it.has_followed}
                handleFollow={() => handleFollow(it.user.id)}
                handleCancelFollow={() => handleCancelFollow(it.user.id)}
              />
            ))}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Follower;
