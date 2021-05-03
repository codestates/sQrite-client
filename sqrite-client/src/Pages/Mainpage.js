import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import Postpreview from "../Components/Postpreview"
import fakeData from "../Components/test/fakeData" // for test

// 로그인 버튼을 클릭했을 때, signup/login 페이지로 이동할 수 있어야 함 
// 모든 post들을 가져와 리스트로 나열할 수 있도록 요청 전송

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPost: fakeData.allPost
        };
    };

    componentDidMount() {
        // this.getAllPost();
    }

    async getAllPost() {
        const getAllPost = await axios.get("http://localhost:4000/post/content");
        this.setState({ allPost: getAllPost });
    }

    render() {
        const { handleLogout, setPostId, isLogin } = this.props;
        const { allPost } = this.state;
        return (
            <div id="mainpage-container">
                <div id="navbar">
                    <div className="logo-box">
                        <img className="logo-medium" src={sqriteLogo} />
                    </div >
                    <div className="login-box">
                        {isLogin === true
                            ? <>
                                <Link to="/post">WRITE</Link>
                                <Link to="/myinfo" className="mypage">Mypage</Link>
                                <button onClick={() => handleLogout()}>Logout</button>
                            </>
                            : <Link className="login-btn" to="/sign">Login</Link>
                        }
                    </div>
                </div>
                <div className="content-box">
                    <div className="search-box">
                        <input placeholder="검색어를 입력해주세요" id="main-input"></input>
                    </div>
                    <ul className="question-list-box">
                        {allPost.map(eachPost => <Postpreview postData={eachPost} setPostId={setPostId} />)}
                    </ul>
                </div>
            </div>
        )
    }
};

export default withRouter(MainPage);