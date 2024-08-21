import { useEffect } from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Toast } from 'antd-mobile';
import Header from '@components/Header';
import Bottom from '@components/Bottom';
import CreateButton from '@components/CreateButton';
import { useAppContext } from '@utils/context';
import { useCurMenu } from '@utils/hooks';
import { getUser } from '@services/login';
import style from './index.module.scss';

const App = () => {
  const [store, setStore] = useAppContext();
  const location = useLocation();
  const nav = useNavigate();
  const menu = useCurMenu();

  useEffect(() => {
    const init = async () => {
      const userId = Cookies.get('userId');
      if (location.pathname === '/register') {
        nav('/register');
        return;
      }
      if (!userId) {
        Toast.show('Please login again...');
        nav('/login');
        return;
      }
      const res = await getUser(userId);
      if (res.data) {
        setStore({
          user: res.data[0], // 老師是寫user: res.data[0]
        });
        if (store.user) {
          return; // 更改路由時,如果有userId,且store裡也有user那就不需要再執行下面的
        }
        if (location.pathname === '/login') {
          nav('/tweets');
        }
        return;
      }
      nav('/login');
    };
    init();
  }, [location.pathname]); // 加location.pathname, 否則更改路由的時候這個useEffect不重新執行,就抓不到userId

  const onClickCreateTweet = () => {
    nav('/createTweet');
  };

  return (
    <div className={style.container}>
      {!menu.hideHeader && <Header />}
      {/* <Header /> */}
      <Outlet />
      <Bottom />
      {!menu.hideHeader && <CreateButton onClick={onClickCreateTweet} />}
    </div>
  );
};
export default App;
