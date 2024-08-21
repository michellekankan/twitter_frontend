import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from '@containers/Register';
import Login from '@containers/Login';
import App from '@containers/App';
import Tweets from '@containers/Tweets';
import Comment from '@containers/Comment';
import { CxtProvider } from '@utils/context';
import CreateTweet from '@containers/CreateTweet';
import Tweet from '@containers/Tweet';
import My from '@containers/My';
import EditUser from '@containers/EditUser';
import Follower from '@containers/Follower';
import './index.scss';

// import { startVconsole } from './utils/index';

// document.getElementById('root').appendChild(<div>dsdsds</div>);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CxtProvider>
    <BrowserRouter>
      <Routes>
        {/* /是繼承概念所以下面的path前面都會自動加斜槓 */}
        <Route path="/" element={<App />}>
          <Route index element={<Tweets />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          {/* 動態變量 前面加冒號 */}
          <Route path="comment/:id" element={<Comment />} />
          <Route path="createTweet" element={<CreateTweet />} />
          <Route path="my" element={<My />} />
          <Route path="editUser" element={<EditUser />} />
          <Route path="tweet/:id" element={<Tweet />} />
          <Route path="follow" element={<Follower />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </CxtProvider>,
);

// 啟動vconsole 用於手機上
// startVconsole();
