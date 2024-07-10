import { useState } from 'react';
import { TabBar } from 'antd-mobile';
import homeSvg from '@assets/home.svg';
import searchSvg from '@assets/search.svg';
import messageSvg from '@assets/message.svg';
import notificationsSvg from '@assets/notifications.svg';

import style from './index.module.scss';

const menus = [
  {
    key: 'home',
    title: '主頁',
    link: 'tweets',
    icon: <img className={style.icon} src={homeSvg} alt="" />,
  },
  {
    key: 'search',
    title: '搜尋',
    link: '/',
    icon: <img className={style.icon} src={searchSvg} alt="" />,
  },
  {
    key: 'notifications',
    title: '搜尋',
    link: '/',
    icon: <img className={style.icon} src={notificationsSvg} alt="" />,
  },
  {
    key: 'message',
    title: '私訊',
    link: '/',
    icon: <img className={style.icon} src={messageSvg} alt="" />,
  },
];

/**
* 底部bar
*/
const Bottom = () => {
  const [activeKey, setActiveKey] = useState();

  const onChangeTabItem = (key) => {
    setActiveKey(key);
  };

  return (
    <div className={style.container}>
      <TabBar activeKey={activeKey} onChange={onChangeTabItem}>
        {menus.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

export default Bottom;

// 因為常被使用,因此跟Header一樣被src/App/index.js引入
