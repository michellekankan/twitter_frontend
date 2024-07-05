/* eslint-disable import/no-extraneous-dependencies */
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';

const App = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default App;
