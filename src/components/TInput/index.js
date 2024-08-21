/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import { Input } from 'antd-mobile';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import style from './index.module.scss';

/**
 * 富交互的Input
 */
const TInput = ({
  label = '',
  value = undefined,
  length = undefined,
  onChange = () => {},
  ...otherProps
  // type = 'text', // type也可以這樣表示
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    if (value) {
      setIsFocused(true);
      setHide(true);
    }
  }, [value]);

  const onFocus = () => {
    setIsFocused(true);
    setHide(true);
  };

  const onBlur = () => {
    if (!value || value.length === 0) { // !value代表當value是空的時候
      setIsFocused(false);
      setHide(false);
      return;
    }
    setHide(false);
  };

  const onChangeHandler = (val) => {
    if (length && val.length > length) {
      return;
    }
    onChange(val);
  };

  return (
    <div className={hide ? style.tInputFocused : style.tInput}>
      <div className={isFocused ? style.labelFocused : style.label}>
        {label}
        {hide && length && (
        <span className={style.labelRight}>
          {value?.length || 0}
          /
          {length}
        </span>
        )}
      </div>
      <Input
        className={isFocused ? style.inputItemFocused : style.inputItem}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChangeHandler}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        // type={type} // type也可以這樣表示
      />
    </div>
  );
};

TInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  length: PropTypes.number,
  onChange: PropTypes.func,
  // type: PropTypes.string,
};

export default TInput;
