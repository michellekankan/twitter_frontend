// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Button, Form, Input, Dialog,
} from 'antd-mobile';
import { loginService } from '../../services/login';
import './index.css';

const initialValues = {
  username: 'michelle',
  password: '12345',
};

const Login = () => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    const values = form.getFieldsValue();
    const res = await loginService(values.username, values.password);
    if (res && res.length > 0) { // 避免寫if-else
      Dialog.alert({
        content: 'login successfully',
      });
      return;
    }
    Dialog.alert({
      content: 'failed to login',
    });
  };
  return (
    <div className="login">
      <Form
        form={form}
        layout="horizontal"
        mode="card"
        initialValues={initialValues}
        footer={(
          <Button block color="primary" onClick={onSubmit} size="large">
            Login
          </Button>
      )}
      >
        <Form.Item label="Username" name="username">
          <Input placeholder="Enter username" clearable />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input placeholder="Enter password" clearable type="password" />
        </Form.Item>
      </Form>
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
