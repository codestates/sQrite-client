import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Detailpage from './Pages/Detailpage';
import Mainpage from './Pages/Mainpage';
import Mypage from './Pages/Mypage';
import Signpage from './Pages/Signpage';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <Mainpage />
          </Route>
          <Route path="/sign">
            <Signpage />
          </Route>
          <Route path="/myinfo">
            <Mypage />
          </Route>
          <Route path="/detail">
            <Detailpage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
