import { CloseOutline } from 'antd-mobile-icons';
import PropTypes from 'prop-types';
import logo from '../../assets/twitter-logo.svg';
import style from './index.module.scss';

const Header = ({
  onClickClose,
}) => (
  <div className={style.header}>
    <CloseOutline className={style.closeIcon} onClick={onClickClose} />
    <img src={logo} alt="logo" className={style.twitterLogo} />
  </div>
);

Header.propTypes = {
  onClickClose: PropTypes.func.isRequired,
};

export default Header;
