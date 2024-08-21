/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { FrownFill } from 'antd-mobile-icons';
import classNames from 'classnames';
import style from './index.module.scss';

/**
*
*/
const Avatar = ({
  onClick = () => {},
  avatarUrl = '',
  className = '',
}) => (
  <div className={classNames(style.avatarWrap, className)} onClick={onClick}>
    {avatarUrl ? <img src={avatarUrl} alt="" className={style.avatar} />
      : <FrownFill className={style.icon} />}
  </div>
);

Avatar.propTypes = {
  onClick: PropTypes.func,
  avatarUrl: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
