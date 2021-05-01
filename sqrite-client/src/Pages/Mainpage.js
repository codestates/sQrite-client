import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import Postpreview from "../Components/Postpreview"
import fakeData from "../Components/test/fakeData" // for test

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPost: fakeData.allPost
        };
    };

    // componentDidMount() {
    //     this.getAllPost();
    // }

    // getAllPost() {
    //     axios.get("http://localhost:4000/post/content")
    //         .then((res) => {
    //             console.log(res.data);
    //             this.setState({
    //                 postData: res.data
    //             })
    //         })
    // }

    render() {
        const { handlePostClick } = this.props;
        const { allPost } = this.state;
        return (
            <div id="mainpage-container">
                <div id="navbar">
                    <div className="logo-box">
                        <img className="logo-medium" src={sqriteLogo} />
                    </div >
                    <div className="login-box">
                        <span className="mypage">Mypage</span>
                        <button className="login-btn">Login</button>
                    </div>
                </div>
                <div className="content-box">
                    <div className="search-box">
                        <input placeholder="검색어를 입력해주세요" id="main-input"></input>
                    </div>
                    <ul className="question-list-box">
                        {allPost.map(el => <Postpreview postData={el} handlePostClick={handlePostClick} />)}
                    </ul>
                </div>
            </div>
        )
    }
};

export default withRouter(MainPage);