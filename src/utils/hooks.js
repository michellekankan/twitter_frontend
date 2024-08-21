import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getMenuByKey, getMenuByLink, includeMenu } from './constants';

// 獲取當前的菜單
export const useCurMenu = () => {
  const lo = useLocation(); // 獲取當前的路由
  const it = getMenuByLink(lo.pathname);

  return it || {}; // 當it沒有匹配到值的時候,給他一個默認值
};

// 收斂路由的跳轉
export const useGoTo = () => {
  const navigate = useNavigate();
  return (key, params) => {
    if (!key) {
      return navigate(-1); // 如果key是空的,就返回上一頁
    }
    const it = getMenuByKey(key);
    if (!it) return navigate('/'); // 如果it是空的
    // tweet/:id
    const link = generatePath(it.link, params);
    return navigate(link);
  };
};

export const useIncludeMenu = () => {
  const lo = useLocation();
  const result = includeMenu(lo.pathname);
  return result;
};

const MAXY = 100;

/**
 *
 * 下拉刷新hooks 手寫如下 實際上我們直接引入antd-mobile組件
 */
export const usePullToRefresh = () => {
  const y = useRef(0);
  const [tip, setTip] = useState('');
  // scrollTop === 0
  // document.documentElement.scrollTop === 0;
  // touchstart touchmove touchend
  // y的偏移量
  // 最大偏移量 maxY
  // 不需要多次執行的useEffect
  useEffect(() => {
    window.ontouchstart = (e) => {
      if (document.documentElement.scrollTop === 0) {
        y.current = e.touches[0].pageY;
      }
    };

    window.ontouchmove = (e) => {
      if (document.documentElement.scrollTop === 0) {
        // 這兩個if判斷式應該是互斥,當下拉刷新到MAXY時就要釋放立即刷新,所以應該把釋放立即刷新放到第一個當他執行時就會return而不再執行下拉刷新
        if (e.touches[0].pageY - y.current > MAXY) {
          setTip('釋放立即刷新');
          return;
        }
        // 往下移動時現在的y值減去之前的y值 應該會大於0
        if (e.touches[0].pageY - y.current > 0) {
          setTip('下拉刷新');
        }
      }
    };
    // useEffect內的return表示 組件被卸載時他會執行對應的方法, 將以下指向空 以避免影響其他頁面(其他頁面可能繼承)
    return () => {
      window.ontouchstart = null;
      window.ontouchmove = null;
    };
  }, []);

  // 需要多次執行的useEffect
  useEffect(() => {
    window.ontouchend = () => {
      if (document.documentElement.scrollTop === 0) {
        if (tip === '釋放立即刷新') {
          setTip('加載中...');
          setTimeout(() => {
            setTip('刷新成功');
            setTimeout(() => {
              setTip('');
            }, 500);
          }, 1000);
          return;
        }
        setTip(''); // 相當於沒操作到最大距離的時候 就設成空
      }
    };
    return () => {
      window.ontouchend = null;
    };
  }, [tip]);
  return tip;
};

const OFFSET = 50;
/**
 * 上拉加載
 */
export const useDouwnLoad = () => {
  const [loading, setLoading] = useState(false);
  // 判斷是否觸底
  // 1 document.documentElement.clientHeight 文檔的高度
  // document.body.scrollHeight 內容的高度
  // document.documentElement.scrollTop
  // 2 觸底條件 scrollTop + clientHeight = scrollHeight
  // 3 OFFSET 偏移量
  // scrollTop + clientHeight >= scrollHeight - OFFSET
  useEffect(() => {
    window.onscroll = () => {
      // 因為會一直滑動並觸發 因此如果loading是true的時候說明正在發請求就return不再執行下面的判斷式
      if (loading) {
        return;
      }
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setLoading(true); // 因為setLoading是異步的,所以必須在下面寫另一個useEffect對loading進行監聽而不是直接在這下面接著寫
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        console.log('finish');
        setLoading(false);
      }, 2000);
    }
  }, [loading]);
  return loading;
};
