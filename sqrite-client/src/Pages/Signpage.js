import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Signpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 해당 state 값들은 이 페이지에서만 쓰이므로 상위 컴포넌트인 App.js에서 내려줄 필요 없음.
            email : "",
            password : "",
            username : "",
            errorMessage : "",
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    
    // input form에 입력되는 값에 대해 다루는 메소드
    handleInputValue = (key) => (e) => {
        this.setState ({
            [key] : e.target.value
        });
    }

    // ** 로그인을 다루는 메소드 **
    // 로그인 메소드에서는 accessToken이 존재하는지의 여부에 대해서도 체크해줘야 함.
    // 만약 로그인을 했을 때, res.body에 accessToken에 토큰값이 존재한다면
    // 로그인에 성공했음을 알리고 다시 main page로 이동한다.
    handleLogin = () => {
        // 로그인할 때는 state에서 email, password의 값만 확인하면 된다.
        const { email, password } = this.state;
        if(email.length===0 || password.length===0){
            return this.state({
                errorMessage : "이메일과 비밀번호 모두 입력해야 로그인이 가능합니다."
            })
        }else{
            // login 동작은 서버에 post 요청을 전송해주어야 함.
            axios.post("http://localhost:4000/user/login",{
                email,
                password 
            }).then((res)=>{ 
                if(res){ // 만약 로그인이 정상적으로 이루어져서 서버에서 토큰을 받아왔다면 if(res.body.accessToken)
                    this.setState({
                        // isLogin은 App.js에서 props를 통해 내려준 state 값
                        isLogin : true
                    })
                    // handleLoginSuccess은 App.js에서 props를 통해 내려준 메소드
                    this.props.handleLoginSuccess(); 
                    this.props.history.push("/Mainpage") // 로그인 후 main page로 이동
                }          
            }).catch((err)=>{
                this.setState({
                    email : "",
                    password : "",
                    errorMessage : "오류가 발생하여 재로그인이 필요합니다."
                })
            })
        }
    }
    
    // ** 가입을 다루는 메소드 **
    // 만약 가입을 했을 때, post요청에 대한 res 값이 정상적으로 돌아온다면
    // 가입에 성공한 것이므로 login을 할 수 있도록 login 페이지를 띄운다.
    handleSignUp = () => {
        const { email, password, username } = this.state;
        if( email.length === 0 || password.length ===0 || username.length ===0 ){
            return this.setState({
                errorMessage : "이름, 이메일, 비밀번호 모두 입력해야 가입이 가능합니다"
            })
        }else{
            // signup 동작은 서버에 post 요청을 전송해주어야 함.
            axios.post("http://localhost:4000/user/signup",{
                email,
                password,
                username
            }).then((res) => {
                if(res) {
                    // 정상적으로 서버에 데이터가 올라갔다면, sign의 디폴트 페이지인 로그인이 뜨도록 다시 이동
                    this.props.history.push("/sign");
                }
            })
        }
    }

    // 처음 렌더될 때 디폴트 페이지는 반드시 로그인 페이지여야 함.
    // 로그인을 하고 있을 땐 가입 section에 버튼 또는 링크로 연결되는 a 태그 등만 존재해야하고
    // 반대로 가입을 하고 있을 땐 로그인 section에 버튼 또는 링크 연결 태그만이 존재해야 함
    // => 조건식을 통해서 제어해야 할까 ??? 
    // 현재 상태에 대해 알 수 있는 state를 하나 더 추가해서 그 값에 따라 각 페이지의 전환을
    // 조건에 따라 결정할 수도 있을 듯... 일단 조금 더 고민해 보기!
    // ex) signup (x) / login(o) 상태랑 signup(o) / login(x) 상태 전환할 때
    // {this.state.isDefault ?
    //    <div id="signup">
    //    
    //    </div>
    //    : null
    //  }

    render() {
        return (
            <div id="signpage-container">
                    <div className="signpage-flex-box">
                    <div>
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
                            type='text'
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
                            onChange={this.handleInputValue("password")}
                            ></input>
                        </div>                        
                        <button
                            className="btn btn-signup"
                            type='submit'
                            onClick={this.handleSignup}
                        >
                            회원가입
                        </button>
                    </form>
                </div>
                </div>
                <div className="signpage-flex-box">
                    <div>
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
                                onClick={this.handleLogin}
                            >
                                로그인
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signpage);