import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './main';
import Styles from './app.module.scss';
import AccountPage from './account_page/account_page_container';
import { useHistory } from "react-router-dom";
import Reports from './reports/reports_container';

function App() {

  const history = useHistory();
  return (
    <div className={Styles.app}>
      {/* <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/reports' component={Reports}/>
        <Route exact path='/accounts/:account' component={AccountPage} history={history}/>
      </Switch> */}
    </div>
  );
}

export default App;