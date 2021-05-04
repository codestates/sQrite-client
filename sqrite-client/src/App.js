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
      isLogin: true,
      userinfo: {
        id: 4,
        email: "test4@test.com",
        password: "1234",
        username: "kimcoding4",
        createdAt: "2021-05-03 06:10:21",
        updatedAt: "2021-05-03 06:10:21"
      },
      accessToken: ""
    };
  }

  // initializeUserInfo() {
  //   if (localStorage.getItem("loggedInfo") === true) {
  //     this.setState({
  //       isLogin: true
  //     })
  //   }
  // }

  // handleLoginSuccess(accessToken, email) {
  //   this.setState({
  //     isLogin: true,
  //     accessToken,
  //     email: email
  //   })
  //   localStorage.setItem("loggedInfo", true)
  // }

  // componentWillMount() {
  //   const loggedInfo = localStorage.getItem("loggedInfo")
  //   if (loggedInfo) {
  //     this.setState({
  //       isLogin: JSON.parse(loggedInfo)
  //     })
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (JSON.stringify(prevState.loggedInfo) !== JSON.stringify(this.state.isLogin)) {
  //     localStorage.loggedInfo = JSON.stringify(this.state.isLogin)
  //   }
  // }

  // async handleLogout() {
  //   const { email } = this.state;
  //   console.log(email)
  //   await axios.post("http://localhost:4000/user/logout", {
  //     email
  //   }, {
  //     withCrendentials: true
  //   });
  //   this.setState({ userinfo: null, isLogin: false, accessToken: null });
  //   localStorage.setItem("loggedInfo", false)
  //   this.props.history.push('/');
  // }

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