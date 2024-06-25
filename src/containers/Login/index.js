import { useState } from'react';
import './index.css';


const Login = () => {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const clickHandler = () => {
    alert('Login successfully ' + name + ',' + pwd);
  }

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangePwd = (e) => {
    setPwd(e.target.value);
  }

  return (
    <div className="login">
      {name}
      {pwd}
      <div>Username<input onChange={onChangeName}/></div>
      <div>Password<input type="password" onChange={onChangePwd}/></div>
      <div><button onClick={clickHandler}>Login</button></div>
    </div>
  );
}

export default Login;

/*ch3 
引用 import { useState } from'react';
const [name, setName] = useState('');
const [pwd, setPwd] = useState('');
{name}
{pwd}

*/
