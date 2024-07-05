import PropTypes from 'prop-types';
import { Input } from 'antd-mobile';
import { useState } from 'react';
import Footer from './Footer';
import style from '../index.module.scss';

/**
 *第二步驟 添加密碼
 */
const TwoStep = ({
  confirmRegisterHandler,
  userInfo,
}) => {
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(true);

  const onConfirmRegister = () => {
    confirmRegisterHandler(password);
  };

  const onChangePwd = (val) => {
    setPassword(val);
  };

  const onChangeConfirmPwd = (val) => {
    if (val === password) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  };

  return (
    <div className={style.TwoStep}>
      <div className={style.form}>
        <div className={style.formTitle}>Create your account</div>
        <div className={style.showLabelContainer}>
          <div className={style.showLabel}>
            Name:
            <span>{userInfo.username}</span>
          </div>
          {userInfo.email && (
          <div className={style.showLabel}>
            Email:
            <span>{userInfo.email}</span>
          </div>
          )}
          {userInfo.tel && (
          <div className={style.showLabel}>
            Phone Number:
            <span>{userInfo.tel}</span>
          </div>
          )}
          <div className={style.showLabel}>
            Birthday:
            <span>{userInfo.birthday}</span>
          </div>
        </div>
        <div className={style.label}>Please enter your password</div>
        <Input className={style.input} onChange={onChangePwd} type="password" />
        <div className={style.label}>Please confirm your password</div>
        <Input className={style.input} onChange={onChangeConfirmPwd} type="password" />
        {disabled && <div className={style.showTip}>Password do not match</div>}
      </div>
      <Footer disabled={disabled} label="Confirm" onClickNextStep={onConfirmRegister} />
    </div>
  );
};

TwoStep.propTypes = {
  confirmRegisterHandler: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    tel: PropTypes.string,
    birthday: PropTypes.string,
  }).isRequired,
};

export default TwoStep;
