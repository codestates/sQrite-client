import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import Mypagepreview from "../Components/Mypagepreview"
import fakeData from "../Components/test/fakeData" // for test

class Mypage extends React.Component {
    constructor(props) {
        super(props);
        //userinfo가 props
        this.state = {
            postData: null,
            commentData: null
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
        }, {
            withCrendentials: true
        });
        // 데이터 받아왔을 떄 최근 글 3개만 나오게 해주어야 하는데 어떻게 구현하면 될지???
        if (currentPosts) {
            this.setState({
                postData: currentPosts.data
            })
            console.log("postData :", this.state.postData)
        }
    }

    async getUserCurrentCommnents() {
        const currentComments = await axios.get("http://localhost:4000/comment/comment", {
            params: {
                user_id: this.props.userinfo.id //  user_id:1 => ?user_id=1
            }
        }, {
            withCrendentials: true
        });
        if (currentComments) {
            this.setState({
                commentData: currentComments.data
            })
        }
        console.log("commentData :", this.state.commentData)
    }
    render() {
        const { postData, commentData } = this.state;
        const { email, username, createdAt } = this.props.userinfo
        if (!postData || !commentData) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div className="px-8 w-max mx-auto mb-10 my-10">
                <div className="mylists flex justify-between items-start">
                    <ul className="grid mx-4 border-t border-l border-r-4 border-b-8 border-gray-300 rounded-3xl pt-1 pl-2 pr-2">
                        <div className="text-center m-2 text-xl text-gray-600 font-bold">My Information</div>
                        <div className="border-gray-300 py-1 px-3 border-b">E-mail : {email}</div>
                        <div className="border-gray-300 py-1 px-3 border-b">Name : {username}</div>
                        <div className="border-gray-300 py-1 px-3 border-b">Sign Up : {createdAt.split("T")[0]}</div>
                        <div className="border-gray-300 py-1 px-3 border-b">Questions : {postData.length}</div>
                        <div className="border-gray-300 py-1 px-3 border-b">Answers : {commentData.length}</div>
                    </ul>
                    <ul className="grid-cols-5 mx-4 border-t border-l border-r-4 border-b-8 border-sqrite-green rounded-3xl pt-1 pl-2 pr-2">
                        <div className="text-center m-2 text-xl pb-4 text-sqrite-green font-bold">
                            My Questions
                        </div>
                        {postData.map(eachPost => <Mypagepreview key={eachPost.id} myData={eachPost} />)}
                    </ul>
                    <ul className="grid-cols-5 mx-4 border-t border-l border-r-4 border-b-8 border-sqrite-yellow rounded-3xl pt-1 pl-2 pr-2">
                        <div className="text-center m-2 text-xl pb-4 text-sqrite-yellow font-bold">
                            My Answers
                        </div>
                        {commentData.map(eachComment => <Mypagepreview key={eachComment.id} myData={eachComment} />)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Mypage;