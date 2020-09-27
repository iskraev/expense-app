import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Header from './header';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      {/* <> */}
        {/* <Header state={store.getState()}/> */}
        <App/>
      {/* </> */}
    </BrowserRouter>
  </Provider>
);

export default Root;