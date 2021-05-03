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

    componentDidMount() {
        this.loadMypage();
    }

    async loadMypage() {
        await this.getUserCurrentCommnents();
        await this.getUserCurrentPosts();
    }

    // userinfo의 Id와 일치하는 포스트, 댓글만을 가져와야 한다.
    async getUserCurrentPosts() {
        const currentPosts = await axios.get("http://localhost:4000/post/content", {
            params: {
                user_id: this.props.userinfo.id
            }
        },{
            headers:{'Authorization': `Bearer ${this.props.accessToken}`}
        },{
            withCrendentials : true
        });
        console.log(currentPosts.data)
        // 데이터 받아왔을 떄 최근 글 3개만 나오게 해주어야 하는데 어떻게 구현하면 될지???
        if( currentPosts ){
            this.setState({
                postData : currentPosts
            })
        }
    }

    async getUserCurrentCommnents() {
        const currentComments = await axios.get("http://localhost:4000/comment/comment", {
            params: {
                user_id: this.props.userinfo.id
            }
        },{
            headers:{'Authorization': `Bearer ${this.props.accessToken}` }
        },{
            withCrendentials : true
        });

        if( currentComments ){
            this.setState({
                commentData : currentComments
            })
        }
    }
    render() {
        const { postData, commentData } = this.state;
        const { setPostId } = this.props;
        const { email, username, createdAt } = this.props.userinfo
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
                            <div>질문 개수 : </div>
                            <div>답변 개수 : </div>
                        </div>
                    </div>
                    <div className="mylists-box">
                        <div className="mylists">
                            <div className="mylists-flex">
                                <div className="mylists-title">
                                    <span>My Questions</span>
                                </div>
                                {postData.map(eachPost => <Mypagepreview myData={eachPost} setPostId={setPostId} />)}
                            </div>
                            <div className="mylists-flex">
                                <div className="mylists-title">
                                    <span>My Answers</span>
                                </div>
                                {commentData.map(eachComment => <Mypagepreview myData={eachComment} setPostId={setPostId} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mypage;