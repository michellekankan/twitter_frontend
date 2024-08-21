import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Button, Form, Dialog,
} from 'antd-mobile';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import TInput from '@components/TInput';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { login } from '../../services/login';
import style from './index.module.scss';

/**
 *登錄頁面
 */
const Login = () => {
  const [form] = Form.useForm();
  const go = useGoTo();
  const [, setStore] = useAppContext();

  useEffect(() => {
    setStore({
      closeHeaderHandler: null,
    });
  }, []);

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        const res = await login(values.username, values.password);
        console.log(res);
        if (res.success && res.data.length > 0) { // 避免寫if-else
          Dialog.alert({
            content: 'login successfully',
          });
          Cookies.set('userId', res.data[0].id);
          go('tweets');
          return;
        }
        Dialog.alert({
          content: 'failed to login',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.login}>
      <div className={style.formTitle}>Login Twitter</div>
      <Form
        form={form}
        className={style.formContainer}
      >
        <Form.Item
          name="username"
          rules={[{
            required: true,
            message: 'Please enter your username',
          }]}
        >
          <TInput label="Name" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Please enter your password',
          }]}
        >
          <TInput label="Password" type="password" />
        </Form.Item>
        <Button className={style.footerButton} onClick={onSubmit}>Next</Button>
      </Form>
      <div className={style.goToRegister}>
        do not have an account?
        <Link to="/register">sign up</Link>
      </div>
    </div>
  );
};

export default Login;

/* ch3
引用 import { useState } from'react';
const [name, setName] = useState('');
const [pwd, setPwd] = useState('');
{name}
{pwd}

ch4
引用antd-mobile
 <div className="login">
      <Form
      form={form} 要寫這個才有辦法傳到後端
      layout='horizontal' mode='card' initialValues={initialValues}
      footer={
        <Button block color='primary' onClick={onSubmit} size='large'>
          Login
        </Button>
      }>
        <Form.Item label='Username' name='username'>
          <Input placeholder='Enter username' />
        </Form.Item>
        <Form.Item name='password'>
          <PasscodeInput length={3} keyboard={<NumberKeyboard />}/>
        </Form.Item>
      </Form>
    </div>

*/
