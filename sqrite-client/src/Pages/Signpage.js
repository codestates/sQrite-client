import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Signpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 해당 state 값들은 이 페이지에서만 쓰이므로 상위 컴포넌트인 App.js에서 내려줄 필요 없음.
            email: "",
            username: "",
            password: "",
            checkPassword: "",
            errorMessage: "",
            isDefault: true
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleDefault = this.handleDefault.bind(this);
    }

    componentWillMount() {
        this.props.hideNav();
    }

    componentWillUnmount() {
        this.props.hideNav();
    }

    // input form에 입력되는 값에 대해 다루는 메소드
    handleInputValue = (key) => (e) => {
        this.setState({
            [key]: e.target.value
        });
    }


    // ** 로그인을 다루는 메소드 **
    // 로그인 메소드에서는 accessToken이 존재하는지의 여부에 대해서도 체크해줘야 함.
    // 만약 로그인을 했을 때, res.body에 accessToken에 토큰값이 존재한다면
    // 로그인에 성공했음을 알리고 다시 main page로 이동한다.
    handleLogin = () => {
        // 로그인할 때는 state에서 email, password의 값만 확인하면 된다.
        const { email, password } = this.state;

        if (email.length === 0 || password.length === 0) {
            this.setState({
                errorMessage: "이메일과 비밀번호 모두 입력해야 로그인이 가능합니다."
            })
        } else {
            // login 동작은 서버에 post 요청을 전송해주어야 함.
            axios.post("http://localhost:4000/user/login", {
                email,
                password
            })
                .then((res) => {
                    // console.log(res)
                    if (res.status === 200) { // 만약 로그인이 정상적으로 이루어져서 서버에서 토큰을 받아왔다면 if(res.body.accessToken)
                        console.log(res)
                        this.props.handleLoginSuccess(
                            res.data.data.accessToken,
                            res.data.userinfo
                        );
                        this.props.history.push("/"); // 로그인 후 main page로 이동
                    } else if (res.status === 404) {
                        alert("올바른 이메일과 비밀번호를 입력해주십시오.");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    // ** 가입을 다루는 메소드 **
    // 만약 가입을 했을 때, post요청에 대한 res 값이 정상적으로 돌아온다면
    // 가입에 성공한 것이므로 login을 할 수 있도록 login 페이지를 띄운다.

    checkEmail(emailValue) {
        const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(emailValue);
    }

    checkPassword(passwordValue) {
        const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
        return regExp.test(passwordValue);
    }

    handleSignUp = () => {
        const { email, password, checkPassword, username } = this.state;
        if (email.length === 0 || password.length === 0 || username.length === 0) {
            return this.setState({
                errorMessage: "이름, 이메일, 비밀번호 모두 입력해야 가입이 가능합니다"
            })
        } else if (!this.checkEmail(email) || !this.checkPassword(password) || checkPassword !== password) {
            if (!this.checkEmail(email)) alert("이메일 형식이 맞지 않습니다.");
            if (!this.checkPassword(password)) alert("비밀번호는 8글자 이상 10글자 이하의 영어와 숫자의 조합이여야 합니다.")
            if (checkPassword !== password) alert("비밀번호가 일치하지 않습니다");
        } else {
            // signup 동작은 서버에 post 요청을 전송해주어야 함.
            axios.post("http://localhost:4000/user/signup", {
                email,
                password,
                username
            }).then((res) => {
                if (res) {
                    // 정상적으로 서버에 데이터가 올라갔다면, sign의 디폴트 페이지인 로그인이 뜨도록 다시 이동
                    this.setState({
                        isDefault: true
                    })
                }
            })
        }
    }

    handleDefault() {
        this.setState({
            isDefault: !this.state.isDefault
        })
    }

    render() {
        return (
            <div id="signpage-container">
                <div className="signpage-flex-box">
                    <div>
                        {this.state.isDefault === false
                            ?
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <span>EMAIL</span>
                                    <input
                                        type="email"
                                        onChange={this.handleInputValue("email")}
                                    ></input>
                                </div>
                                <div>
                                    <span>USERNAME</span>
                                    <input
                                        type="text"
                                        onChange={this.handleInputValue("username")}
                                    ></input>
                                </div>
                                <div>
                                    <span>PASSWORD</span>
                                    <input
                                        type="password"
                                        onChange={this.handleInputValue("password")}
                                    ></input>
                                </div>
                                <div>
                                    <span>CHECK PASSWORD</span>
                                    <input
                                        type="password"
                                        onChange={this.handleInputValue("checkPassword")}
                                    ></input>
                                </div>
                                <button
                                    className="btn btn-signup"
                                    type='submit'
                                    onClick={() => this.handleSignUp()}
                                >
                                    SUBMIT
                        </button>
                            </form>
                            :
                            <button onClick={this.handleDefault}>
                                SIGN UP
                    </button>
                        }
                    </div>
                </div>
                <div className="signpage-flex-box">
                    <div>
                        {this.state.isDefault === true
                            ?
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <span>EMAIL</span>
                                    <input
                                        type="email"
                                        onChange={this.handleInputValue("email")}
                                    ></input>
                                </div>
                                <div>
                                    <span>PASSWORD</span>
                                    <input
                                        type="password"
                                        onChange={this.handleInputValue("password")}
                                    ></input>
                                </div>
                                <button
                                    className="btn btn-login"
                                    type='submit'
                                    onClick={() => this.handleLogin()}
                                >
                                    SUBMIT
                        </button>
                            </form>
                            :
                            <button onClick={() => this.handleDefault()}>
                                SIGN IN
                    </button>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signpage);