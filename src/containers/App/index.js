/* eslint-disable import/no-extraneous-dependencies */
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import Bottom from '@components/Bottom';

const App = () => (
  <>
    <Header />
    <Outlet />
    <Bottom />
  </>
);

export default App;
