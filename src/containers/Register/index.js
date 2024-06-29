/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button, Input } from 'antd-mobile';

import Header from '@components/Header';
import DatePickerInput from '@components/DatePickerInput';
import style from './index.module.css';
/**
 *  register page
 */

const Regsister = () => {
  console.log('');
  return (
    <div>
      <Header />
      <div className={style.form}>
        <div className={style.formTitle}>Create your account</div>
        <Input placeholder="Name" className={style.input} />
        <Input placeholder="Phone" className={style.input} />
        <div className={style.changeTypeButton}>Use email instead</div>
        <div className={style.birthdayTitle}>Date of birth</div>
        <div>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>
        <DatePickerInput />
      </div>
      <div className={style.footer}>
        <Button className={style.footerButton}>Next</Button>
      </div>
    </div>
  );
};

export default Regsister;
