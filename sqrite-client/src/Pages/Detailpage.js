import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import autosize from 'autosize'
import fakeData from "../Components/test/fakeData"

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPost: fakeData.allPost[0],
            currentComment: fakeData.commentData,
            updatePostInput: "",
            commentInput: ""
        };
    };

    componentDidMount() {
        const detailTextarea = document.getElementById("detail-textarea");
        const postUpdateTextarea = document.getElementById("post-update-textarea");
        detailTextarea.focus();
        postUpdateTextarea.focus();
        autosize(detailTextarea);
        autosize(postUpdateTextarea);
        this.loadDetailPage();
    }

    async loadDetailPage() {
        await this.getDetailPage(this.props.postId);
        await this.postUserVerify(this.btnOnDisplay);
    }

    async getDetailPage(postId) {
        const getCurrentPost = await axios.get(`http://localhost:4000/post/content?post_id=${postId}`);
        console.log(getCurrentPost.data[0])
        const getCurrentComment = await axios.get(`http://localhost:4000/comment/comment?post_id=${postId}`);
        console.log(getCurrentComment.data)
        this.setState({ currentPost: getCurrentPost.data[0], currentComment: getCurrentComment.data });
    }

    // 게시물 삭제 메소드
    deletePost() {
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
            // 게시물을 삭제하는 요청을 서버에 보낸다.
            // 그리고 게시물을 삭제했다면, 메인페이지로 이동하고 alert를 이용해 삭제가 완료되었음을 알린다.
            axios.delete("http://localhost:4000/post/content", {
                params: {
                    post_id: this.props.postId
                }
            }).then((res) => {
                this.props.history.push("/");
                alert("게시물이 삭제되었습니다.")
            })
        }
    }

    handleCommentInput(e) {
        this.setState({ commentInput: e.target.value });
    }
    // 답글을 가져오는 메소드
    getComment() {
        const { userId, postId } = this.props;
        axios.get("http://localhost:4000/comment/comment", {
            params: {
                user_id: userId,
                post_id: postId
            }
        }
        ).then((res) => {
            this.setState({
                currentComment: res.commentData
            })
        })
    }


    handleUpdateInput = (e) => {
        this.setState({ updatePostInput: e.target.value });
    }

    postUserVerify(callback) {
        console.log("post-userId :", this.state.currentPost.user_id, "userinfo-userId :", this.props.userinfo.id)
        if (this.state.currentPost.user_id === this.props.userinfo.id) {
            callback();
        } else {
            return;
        }
    }

    // 댓글을 작성하는 메소드
    createComment() {
        axios.post("http://localhost:4000/comment/comment", {
            user_id: this.props.userinfo.id,
            post_id: this.state.currentPost.id,
            content: this.state.commentInput
        })
            .then((res) => {
                if (res.status === 200) {
                    // 정상적으로 댓글이 작성되고 데이터에 추가되었다면 댓글 입력창을 다시 초기화 해주어야 함.
                    window.location.reload();
                } else {
                    alert("답변 작성을 실패하였습니다.")
                }
            })
            .catch(err => console.log(err))
    }

    // 댓글을 삭제하는 메소드
    deleteComment(commentId) {
        // comment_id를 가지고 요청을 보내야하는데, comment_id는 각 댓글의 삭제 버튼을
        // 눌렀을 때, 그 댓글의 정보에서 id를 찾아 보내주면 된다.
        axios.delete("http://localhost:4000/comment/comment", {
            params: commentId
        })
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    btnOnDisplay() {
        const fixAndDelete = document.getElementsByClassName("post-btn-display")[0];
        fixAndDelete.style.display = "block";
    }

    updateInputOnDisplay() {
        const updateInput = document.getElementsByClassName("update-input-display")[0];
        const postUpdateTextarea = document.getElementById("post-update-textarea");
        if (updateInput.style.display === "none") {
            postUpdateTextarea.defaultValue = this.state.currentPost.content;
            updateInput.style.display = "block";
        } else {
            updateInput.style.display = "none"
        };
    }

    updatePost() {
        axios.put("http://localhost:4000/post/content", {
            post_id: this.props.postId,
            title: this.state.currentPost.title,
            content: this.state.updatePostInput
        })
            .then(res => console.log(res))
            .then(window.location.reload())
            .catch(err => console.log(err))
    }

    render() {
        const { currentPost, currentComment } = this.state;
        return (
            <div id="detailpage-container">
                <div>
                    <img className="logo-medium" src={sqriteLogo} />
                </div>
                <div className="detail-content-box-flex">
                    <div className="detail-q-title-box">
                        <h1 className="detail-q-title">{currentPost.title}</h1>
                        <span style={{ display: "none" }} className="post-btn-display">
                            <button onClick={() => this.updateInputOnDisplay()}>MODIFY</button>
                            <button onClick={() => this.deletePost()}>DELETE</button>
                        </span>
                        <div className="detail-title-detail">
                            <span>Question from Gwan-Woo-Jeong</span><br></br>
                            <span>{currentPost.createdAt}</span>
                        </div>
                    </div>
                    <div className="detail-padding">
                        <div className="detail-content">
                            {currentPost.content}
                        </div>
                        <div style={{ display: "none" }} className="detail-editing update-input-display">
                            <textarea
                                id="post-update-textarea"
                                type='text'
                                onChange={(e) => this.handleUpdateInput(e)}
                            ></textarea>
                            <button onClick={() => this.updatePost()}>
                                UPDATE
                            </button>
                        </div>
                    </div>
                    <div >
                        {currentComment.map(eachComment =>
                            <div key={eachComment.id}>
                                <div className="detail-a-title-box">
                                    <h2 className="detail-a-title">Re : {currentPost.title}</h2>
                                </div>
                                <div className="detail-title-detail">
                                    <span>Answer from Bo-Sung-Kim</span><br></br>
                                    <span>{eachComment.createdAt}</span>
                                </div>
                                {
                                    eachComment.user_id === this.props.userinfo.id
                                        ?
                                        <button onClick={() => this.deleteComment(eachComment.id)}>DELETE</button>
                                        :
                                        null
                                }
                                <div className="detail-content">
                                    {eachComment.content}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative detail-padding">
                        <textarea id="detail-textarea" placeholder="질문에 대한 의견을 공유해주세요!" onChange={(e) => this.handleCommentInput(e)}></textarea>
                        <button id="answer-btn" onClick={() => this.createComment()}>Submit</button>
                    </div>
                </div >
            </div >
        )
    }
};

export default withRouter(Detailpage);