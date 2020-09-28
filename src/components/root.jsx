import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Header from './header';
import Footer from './footer';

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 2000,
  offset: '90px',
  // you can also just use 'scale'
  transition: transitions.FADE
}


const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <>
          <Header state={store.getState()}/>
          <App/>
          <Footer />
        </>
      </AlertProvider>
    </BrowserRouter>
  </Provider>
);

export default Root;