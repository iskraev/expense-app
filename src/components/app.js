import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Styles from './app.module.scss';
import ShowPage from './show_page/show_page_container';
import { useHistory } from "react-router-dom";
import Reports from './reports/reports_container';
import Landing from './landing'
function App() {

  const history = useHistory();
  return (
    <div className={Styles.app}>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route exact path='/reports' component={Reports}/>
        <Route exact path='/accounts/:account' component={ShowPage} history={history}/>
        <Route exact path='/categories/:category' component={ShowPage} history={history}/>
      </Switch>
    </div>
  );
}

export default App;