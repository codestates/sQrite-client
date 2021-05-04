import React, {useState} from "react";
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
            allPost: null,
            searchWord : ""
        };
        this.searchWord = this.searchWord.bind(this);
    };

    componentDidMount() {
        this.getAllPost();
    }

    async getAllPost() {
        const getAllPost = await axios.get("http://localhost:4000/post/content");
        console.log(getAllPost.data);
        this.setState({ allPost: getAllPost.data });
    }

    searchWord = (e) => {
        this.setState({ 
            searchWord : e.target.value 
        });
    };

    render() {
        const { handleLogout, isLogin } = this.props;
        const { allPost, searchWord } = this.state;
        if(this.state.allPost === null){
            return <div>loading...</div>
        }
        const filteredContent = allPost.filter(eachPost=> {
            return eachPost.title.toLowerCase().includes(searchWord);
        })
        return (
            <div id="mainpage-container">
                <div id="navbar">
                    <div className="logo-box">
                        <Link to="/"><img className="logo-medium" src={sqriteLogo} /></Link>
                    </div >
                    <div className="login-box">
                        {isLogin === true
                            ? <div>
                                <Link to="/post"><button>WRITE</button></Link>
                                <button className="logout-btn" onClick={() => handleLogout()}>LOGOUT</button>
                                <Link to="/myinfo" className="mypage">Mypage</Link>
                            </div>
                            : <button className="login-btn" onClick={() => this.props.history.push("/sign")}>Login</button>
                        }
                    </div>
                </div>
                <div className="content-box">
                    <div className="search-box">
                        <input type="search" placeholder="검색어를 입력해주세요" id="main-input" onChange={this.searchWord}></input>
                    </div>
                    <ul className="question-list-box">
                        {filteredContent.map(eachPost => <Postpreview key={eachPost.id} postData={eachPost} />)}
                    </ul>
                </div>
            </div>
        )
    }
};

export default withRouter(MainPage);