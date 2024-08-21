import { Popup, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import { UserOutline } from 'antd-mobile-icons';
import Cookies from 'js-cookie';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import Avatar from '@components/Avatar';
import style from './index.module.scss';

/**
* 個人信息的抽屜
*/
const MyPopup = ({
  visible,
  onClose,
}) => {
  const [store] = useAppContext();
  const go = useGoTo();

  const handleToMy = () => {
    onClose();
    go('my');
  };
  const handleLogout = () => {
    Cookies.set('userId', '');
    Toast.show('登出成功');
    window.location.reload();
  };
  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      position="left"
      bodyStyle={{ width: '60vw' }}
    >
      <div className={style.container}>
        <div className={style.title}>帳號信息</div>
        <Avatar avatarUrl={store.user?.avatar_url} className={style.avatar} />
        <div className={style.nickname}>
          {store.user?.nickname || 'unknown'}
        </div>
        <div className={style.username}>
          @
          {store.user?.username}
        </div>
        <div className={style.follower} onClick={() => go('follow')}>
          <span className={style.number1}>100</span>
          正在關注
          <span className={style.number2}>200</span>
          關注者
        </div>
        <div className={style.listItem} onClick={handleToMy}>
          <UserOutline />
          <span className={style.info}>
            個人資料
          </span>
        </div>
        <div className={style.footer} onClick={handleLogout}>
          登出
        </div>
      </div>
    </Popup>
  );
};

MyPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MyPopup;
