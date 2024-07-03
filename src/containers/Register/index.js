/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { Toast } from 'antd-mobile';
import Header from '@components/Header';
import { registerUser } from '@services/register';
import Show from '@components/Show';
import OneStep from './components/OneStep';
import TwoStep from './components/TwoStep';

// 步數標識
const STEP = {
  ONE: 1,
  TWO: 2,
};

/**
 *  register page
 */
const Register = () => {
  const [step, setStep] = useState(STEP.ONE);
  const [userInfo, setUserInfo] = useState({});

  const onClickClose = () => {
    setStep(STEP.ONE);
  };

  const gotoNextStepHandler = (data) => {
    setUserInfo(data);
    setStep(STEP.TWO);
  };

  const confirmRegisterHandler = async (password) => {
    try {
      const res = await registerUser({
        password,
        ...userInfo,
      });
      console.log(res);
      if (res.success) {
        Toast.show('Login successfully'); // 類似js裡的alert
        return;
      }
      Toast.show('Fail to login');
    } catch (error) {
      console.error(error);
      Toast.show('Fail to login');
    }
  };

  return (
    <div>
      <Header onClickClose={onClickClose} />
      <Show visible={step === STEP.ONE}>
        <OneStep gotoNextStepHandler={gotoNextStepHandler} />
      </Show>
      <Show visible={step === STEP.TWO}>
        <TwoStep userInfo={userInfo} confirmRegisterHandler={confirmRegisterHandler} />
      </Show>
    </div>
  );
};

export default Register;

/*
 <div>
      <Header onClickClose={onClickClose} />
      {step === STEP.ONE && <OneStep gotoNextStepHandler={gotoNextStepHandler} />}
      {step === STEP.TWO && <TwoStep userInfo={userInfo} confirmRegisterHandler={confirmRegisterHandler} />}
    </div>
原本是寫以上這樣,可是如果從第二步返回第一步時，第一步所填的資料都會被刪掉，因此改引用Show當方法來解決此問題
 */
