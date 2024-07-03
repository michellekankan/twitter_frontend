/* eslint-disable react/require-default-props */
import { CloseOutline } from 'antd-mobile-icons';
import PropTypes from 'prop-types';
import logo from '../../assets/twitter-logo.svg';
import style from './index.module.scss';

const Header = ({
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
