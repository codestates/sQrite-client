import axios from 'axios';
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
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
      // isLogin: localStorage.getItem("loggedInfo"),
      isLogin: false,
      userinfo: {},
      accessToken: ""
    };
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  initializeUserInfo() {
    if (localStorage.getItem("loggedInfo") === true) {
      this.setState({
        isLogin: true
      })
    }
  }

  handleLoginSuccess(accessToken, userinfo) {
    this.setState({
      isLogin: true,
      accessToken: accessToken,
      userinfo: userinfo
    });
    localStorage.setItem("loggedInfo", true);
  }

  componentWillMount() {
    const loggedInfo = localStorage.getItem("loggedInfo")
    if (loggedInfo) {
      this.setState({
        isLogin: JSON.parse(loggedInfo)
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.loggedInfo) !== JSON.stringify(this.state.isLogin)) {
      localStorage.loggedInfo = JSON.stringify(this.state.isLogin)
    }
  }

  async handleLogout() {
    const { email } = this.state.userinfo;
    console.log(email)
    await axios.post("http://localhost:4000/user/logout", {
      email
    }, {
      withCrendentials: true
    })
    .then(()=>{
      this.setState({ userinfo: null, isLogin: false, accessToken: null });
      localStorage.setItem("loggedInfo", false)
      this.props.history.push('/');
    }).catch(err=> console.log(err))
  }

  render() {
    const { isLogin, userinfo } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Mainpage
              isLogin={isLogin}
              userinfo={userinfo}
              handleLogout={this.handleLogout}
            />
          </Route>
          <Route path="/sign">
            <Signpage isLogin={isLogin} handleLoginSuccess={this.handleLoginSuccess} />
          </Route>
          <Route path="/myinfo">
            <Mypage userinfo={userinfo} />
          </Route>
          <Route path="/detail/:postId">
            <Detailpage userinfo={userinfo} />
          </Route>
          <Route path="/post">
            <Postpage userinfo={userinfo} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;