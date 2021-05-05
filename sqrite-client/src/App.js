import axios from 'axios';
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
// import './App.css';
import './index.css'
import Detailpage from './Pages/Detailpage';
import Mainpage from './Pages/Mainpage';
import Mypage from './Pages/Mypage';
import Signpage from './Pages/Signpage';
import Postpage from './Pages/Postpage';
import Nav from './Components/Nav'
import fakeData from "./Components/test/fakeData" // for test

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavHidden: false,
      isLogin: false,
      userinfo: { id: "Guest" },
      accessToken: null
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.hideNav = this.hideNav.bind(this);
  }

  handleLoginSuccess(accessToken, userinfo) {
    this.setState({
      isLogin: true,
      accessToken: accessToken,
      userinfo: userinfo
    });
    localStorage.setItem("loggedInfo", true);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
  }

  componentWillMount() {
    const loggedInfo = JSON.parse(localStorage.getItem("loggedInfo")); // 초기값 "null" -> 조건문에 그대로 넣으면 무조건 참 (파싱 필요)
    if (loggedInfo) { // 로그인 상태 (localstorage에 loggedInfo = true)
      this.setState({
        isLogin: loggedInfo,
        userinfo: JSON.parse(localStorage.getItem("userinfo")),
        accessToken: localStorage.getItem("accessToken")
      })
      console.log(this.state)
    } else { // 로그인이 안 된 상태 (null)
      console.log("비로그인 상태")
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.loggedInfo) !== JSON.stringify(this.state.isLogin)) {
      localStorage.loggedInfo = JSON.stringify(this.state.isLogin)
    }
  }

  async handleLogout() {
    await axios.post("http://localhost:4000/user/logout", {
      email: this.state.userinfo.email
    }, {
      withCrendentials: true
    })
      .then(() => {
        // userinfo의 id는 detailpage에서 post의 user_id와 비교하기 때문에 항상 있어야 함.
        this.setState({ userinfo: { id: "Guest" }, isLogin: false, accessToken: null });
        localStorage.clear();
        window.location.reload();
      }).catch(err => console.log(err))
  }

  hideNav() {
    this.setState({ isNavHidden: !this.state.isNavHidden })
  }
  render() {
    const { isLogin, userinfo } = this.state;
    return (
      <Router>
        {this.state.isNavHidden ?
          null : <Nav isLogin={isLogin} handleLogout={this.handleLogout} />}
        <Switch>
          <Route path="/" exact>
            <Mainpage
              isLogin={isLogin}
            />
          </Route>
          <Route path="/sign">
            <Signpage
              hideNav={this.hideNav}
              isLogin={isLogin}
              handleLoginSuccess={this.handleLoginSuccess}
            />
          </Route>
          <Route path="/myinfo">
            <Mypage userinfo={userinfo} />
          </Route>
          <Route path="/detail/:postId">
            <Detailpage userinfo={userinfo} />
          </Route>
          <Route path="/post">
            <Postpage
              userinfo={userinfo}
              hideNav={this.hideNav}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;