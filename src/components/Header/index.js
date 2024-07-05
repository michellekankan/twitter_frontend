/* eslint-disable react/require-default-props */
import { CloseOutline } from 'antd-mobile-icons';
import { useAppContext } from '@utils/context';
import logo from '../../assets/twitter-logo.svg';
import style from './index.module.scss';

const Header = () => {
  const [store] = useAppContext();
  return (
    <div className={style.header}>
      {store.closeHeaderHandler
      && <CloseOutline className={style.closeIcon} onClick={store.closeHeaderHandler} />}
      <img src={logo} alt="logo" className={style.twitterLogo} />
    </div>
  );
};

export default Header;

/**
 * 使用useAppContext之前Header長這樣
 * const Header = ({
  onClickClose = null,
}) => (
  <div className={style.header}>
    {onClickClose && <CloseOutline className={style.closeIcon} onClick={onClickClose} />}
    <img src={logo} alt="logo" className={style.twitterLogo} />
  </div>
);

Header.propTypes = {
  onClickClose: PropTypes.func,
};

export default Header;
 */
