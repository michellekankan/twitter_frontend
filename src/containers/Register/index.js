/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { Button, Input, Form } from 'antd-mobile';
import DatePickerInput from '@components/DatePickerInput';
import Header from '@components/Header';

import style from './index.module.scss';

// 定義常量 目的是方便作改動
const ACCOUNT_TYPE = {
  TEL: 'TEL',
  EMAIL: 'EMAIL',
};

/**
 *  register page
 */
const Regsister = () => {
  const [form] = Form.useForm();
  const [formData] = useState({
    name: '',
    tel: '',
    email: '',
    birthday: '20230901',
  });

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.TEL);

  const onAccountTypeChange = () => {
    if (accountType === ACCOUNT_TYPE.TEL) {
      setAccountType(ACCOUNT_TYPE.EMAIL);
      return;
    }
    setAccountType(ACCOUNT_TYPE.TEL);
  };

  const onClickNextStep = async () => {
    const validata = await form.validateFields();
    if (validata) {
      console.log(validata);
    }
  };

  return (
    <div>
      <Header />
      <div className={style.form}>
        <div className={style.formTitle}>Create your account</div>
        <Form form={form} initialValues={formData} className={style.formContainer}>
          <Form.Item
            name="name"
            rules={[{
              required: true,
              message: 'Please enter your name.',
            }]}
          >
            <Input placeholder="Name" className={style.input} />
          </Form.Item>
          {accountType === ACCOUNT_TYPE.TEL && (
          <Form.Item
            name="tel"
            rules={[{
              required: true,
              message: 'Please enter your phone number.',
            }]}
          >
            <Input placeholder="Phone" className={style.input} />
          </Form.Item>
          )}
          {accountType === ACCOUNT_TYPE.EMAIL && (
          <Form.Item
            name="email"
            rules={[{
              required: true,
              message: 'Please enter your email.',
            }]}
          >
            <Input placeholder="Email" className={style.input} />
          </Form.Item>
          )}
          <div className={style.changeTypeButton} onClick={onAccountTypeChange}>
            {accountType === ACCOUNT_TYPE.TEL ? 'Use email instead' : 'Use phone instead'}
          </div>
          <div className={style.birthdayTitle}>Date of birth</div>
          <div>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>
          <Form.Item name="birthday">
            <DatePickerInput />
          </Form.Item>
        </Form>
      </div>
      <div className={style.footer}>
        <Button className={style.footerButton} onClick={onClickNextStep}>Next</Button>
      </div>
    </div>
  );
};

export default Regsister;
