import axios from 'axios';
import React from 'react';
import { Switch, BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import './App.css';
import Detailpage from './Pages/Detailpage';
import Mainpage from './Pages/Mainpage';
import Mypage from './Pages/Mypage';
import Signpage from './Pages/Signpage';
import Postpage from './Pages/Postpage';
import fakeData from "./Components/test/fakeData" // for test

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      userinfo: fakeData.userinfo,
      postId: 2
    };
    this.handlePostClick = this.handlePostClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handlePostClick(id) {
    console.log(id)
    this.setState({ postId: id });
  }

  // async 
  handleLogout() {
    // await axios.get("http://localhost:4000/user/logout");
    this.setState({ userinfo: null, isLogin: false });
    this.props.history.push("/");
  }

  render() {
    const { isLogin, userinfo, postId } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Mainpage
              isLogin={isLogin}
              userinfo={userinfo}
              postId={postId}
              handlePostClick={this.handlePostClick}
              handleLogout={this.handleLogout}
            />
          </Route>
          <Route path="/sign">
            <Signpage />
          </Route>
          <Route path="/myinfo">
            <Mypage handlePostClick={this.handlePostClick} userinfo={userinfo} />
          </Route>
          <Route path="/detail">
            <Detailpage postId={postId} userinfo={userinfo} />
          </Route>
          <Route path="/post">
            <Postpage userinfo={userinfo} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);