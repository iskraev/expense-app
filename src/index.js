import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import Root from './components/root';
import configureStore from './store/store';



const initialState = {
  user: {
    username: 'demo'
  },
  accounts: {},
  categories: { 'none': {
    id: 'none',
    title: 'None',
    color: '#000000',
    expenses: []
  }},
  expenses: {}
}

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.userInfo) {

    store = configureStore(JSON.parse(localStorage.userInfo))
    
  } else {
    localStorage.setItem('userInfo', JSON.stringify(initialState));
    store = configureStore(initialState);
  }
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});