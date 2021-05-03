import axios from 'axios';
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Detailpage from './Pages/Detailpage';
import Mainpage from './Pages/Mainpage';
import Mypage from './Pages/Mypage';
import Signpage from './Pages/Signpage';
import fakeData from "./Components/test/fakeData" // for test

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userinfo: fakeData.userinfo,
      postId: 1,
      accessToken : ""
    };
    this.handlePostClick = this.handlePostClick.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  handlePostClick(id) {
    console.log(id)
    // this.setState({ postId: id })
  }

  handleLoginSuccess(accessToken){
    this.setState({
      isLogin : true,
      accessToken
    })
  }

  async handleLogout() {
    await axios.get("http://localhost:4000/user/logout",{
      headers:{'Authorization': `Bearer ${this.state.accessToken}`}
    },{
      withCrendentials : true
    });
    this.setState({ userinfo: null, isLogin: false });
    this.props.history.push('/');
  }

  render() {
    const { isLogin, userinfo, postId, accessToken } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Mainpage
              isLogin={isLogin}
              userinfo={userinfo}
              postId={postId}
              handlePostClick={this.handlePostClick}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/sign">
            <Signpage isLogin={isLogin} handleLoginSuccess={this.handleLoginSuccess}/>
          </Route>
          <Route path="/myinfo">
            <Mypage handlePostClick={this.handlePostClick} userinfo={userinfo} accessToken={accessToken}/>
          </Route>
          <Route path="/detail">
            <Detailpage userId={userinfo.id} postId={postId} accessToken={accessToken}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;