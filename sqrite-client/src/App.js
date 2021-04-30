import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Detailpage from './Pages/Detailpage';
import Mainpage from './Pages/Mainpage';
import Mypage from './Pages/Mypage';
import Signpage from './Pages/Signpage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userinfo: null,
      postId: null
    };
  }

  render() {
    const { isLogin, userinfo, postId } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Mainpage isLogin={isLogin} userinfo={userinfo} postId={postId} />
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
}

export default App;