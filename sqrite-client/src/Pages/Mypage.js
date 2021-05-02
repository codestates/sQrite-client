import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import Mypagepreview from "../Components/Mypagepreview"
import fakeData from "../Components/test/fakeData" // for test

class Mypage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: fakeData.postData,
            commentData: fakeData.commentData
        }
    }

    
    render() {
        const { postData, commentData } = this.state;
        const { setPostId } = this.props;
        const { email, username, createdAt} = this.props.userinfo
        return (
            <div id="mypage-container">
                <div className="logo-box-flex">
                    <img className="logo-medium" src={sqriteLogo} />
                </div>
                <div className="content-box-flex">
                    <div className="myinfo-box">
                        <div className="myinfo">
                            <div>내 정보</div>
                            <div>이메일 : {email}</div>
                            <div>유저이름 : {username}</div>
                            <div>가입날짜 : {createdAt}</div>
                            <div>질문 개수 :</div>
                            <div>답변 개수 : </div>
                        </div>
                    </div>
                    <div className="mylists-box">
                        <div className="mylists">
                            <div className="mylists-flex">
                                <div className="mylists-title">
                                    <span>My Questions</span>
                                </div>
                                {postData.map(el => <Mypagepreview myData={el} setPostId={setPostId} />)}
                            </div>
                            <div className="mylists-flex">
                                <div className="mylists-title">
                                    <span>My Answers</span>
                                </div>
                                {commentData.map(el => <Mypagepreview myData={el} setPostId={setPostId} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mypage;