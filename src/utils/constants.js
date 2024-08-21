import { matchPath } from 'react-router-dom';
import { UnorderedListOutline, UserCircleOutline } from 'antd-mobile-icons';

/* eslint-disable import/prefer-default-export */
export const menus = [
  {
    key: 'follow',
    link: '/follow',
    hideHeader: true,
  },
  {
    key: 'editUser',
    title: '編輯個人資料',
    link: '/editUser',
    hideHeader: true,
  },
  {
    key: 'tweet',
    title: '推文',
    link: '/tweet/:id',
    hideHeader: true,
  },
  {
    key: 'tweets',
    title: '主頁',
    link: '/',
    isMenu: true,
    icon: <UnorderedListOutline />,
  },
  {
    key: 'my',
    title: '個人資料',
    link: '/my',
    isMenu: true,
    icon: <UserCircleOutline />,
  },
  {
    key: 'comment',
    link: '/comment/:id', // 因為是精准匹配matchPath,所以/comment/後面要加:id
    hideHeader: true,
  },
  {
    key: 'createTweet',
    link: '/createTweet',
    hideHeader: true,
  },
];

export const getMenuByKey = (key) => menus.find((item) => item.key === key);
// matchPath('/comment/:id', '/comment/1') => true
export const getMenuByLink = (link) => menus.find((item) => matchPath(item.link, link));
export const includeMenu = (link) => menus.some((item) => item.link === link);
// some()為判斷是否有,與includes（）差別在some()可以傳function
