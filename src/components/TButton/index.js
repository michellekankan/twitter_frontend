/* eslint-disable react/require-default-props */
import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './index.module.scss';

/**
* 公共的BUTTON
*/
const TButton = ({
  onClick,
  children,
  disabled = false,
  className = '', // 自定義��式, 例如: className="my-button"
}) => (
  <Button
    disabled={disabled}
    className={classNames(style.button, className)}
    onClick={onClick}
  >
    {children}
  </Button>
);

TButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default TButton;
