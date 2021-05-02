import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import autosize from 'autosize'
import fakeData from "../Components/test/fakeData"

class Detailpage extends React.Component {
    constructor(props) { // props.post_id
        super(props);
        
        this.state = {
            currentPost: fakeData.allPost[0],
            currentComment: fakeData.commentData,
            updatePostInput: "",
            commentInput: ""
        };
        this.deleteComment = this.deleteComment.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.btnOnDisplay = this.btnOnDisplay.bind(this);
    };

    componentDidMount() {
        // 인풋 창 오토사이징
        const detailTextarea = document.getElementById("detail-textarea");
        const postUpdateTextarea = document.getElementById("post-update-textarea");
        detailTextarea.focus();
        postUpdateTextarea.focus();
        autosize(detailTextarea);
        autosize(postUpdateTextarea);

        // 작성자의 userinfo - id와 게시글의 user_id를 비교하여 질문 수정, 삭제 버튼 생성
        this.postUserVerify(this.btnOnDisplay);
        // this.getDetailPage(this.props.postId);
    }

    async getDetailPage(postId) {
        const getCurrentPost = await axios.get(`http://localhost:4000/post/content?post_id=${postId}`);
        const getCurrentComment = await axios.get(`http://localhost:4000/comment/comment?post_id=${postId}`);
        this.setState({ currentPost: getCurrentPost, currentComment: getCurrentComment });
    }

    // 게시물 삭제 메소드
    deletePost() {
        const { postId } = this.props;
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
            // 게시물을 삭제하는 요청을 서버에 보낸다.
            // 그리고 게시물을 삭제했다면, 메인페이지로 이동하고 alert를 이용해 삭제가 완료되었음을 알린다.
            axios.delete("http://localhost:4000/post/content", {
                params: {
                    post_id: postId
                }
            }).then((res) => {
                alert("게시물이 삭제되었습니다.")
                this.props.history.push("/");
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
        if (this.state.currentPost.user_id === this.props.userinfo.id) {
            callback();
        } else {
            return;
        }
    }

    // 댓글을 작성하는 메소드
    createComment() {
        const { userId, postId } = this.props;
        axios.post("http://localhost:4000/comment/commen", {
            user_id: userId,
            post_id: postId,
            // content : input comment value...
        }).then((res) => {
            if (res.status === 200) {
                // 정상적으로 댓글이 작성되고 데이터에 추가되었다면 댓글 입력창을 다시 초기화 해주어야 함.
            }
        })
    }

    // 댓글을 삭제하는 메소드
    deleteComment(commentId) {
        // comment_id를 가지고 요청을 보내야하는데, comment_id는 각 댓글의 삭제 버튼을
        // 눌렀을 때, 그 댓글의 정보에서 id를 찾아 보내주면 된다.
        axios.delete("http://localhost:4000/comment/comment", {
            params: commentId
        }).then((res) => {
        })

    }

    // 댓글을 작성하는 메소드
    createComment() {
        const { userId, postId } = this.props;
        axios.post("http://localhost:4000/comment/commen", {
            user_id: userId,
            post_id: postId,
            // content : input comment value...
        }).then((res) => {
            if (res.status === 200) {
                // 정상적으로 댓글이 작성되고 데이터에 추가되었다면 댓글 입력창을 다시 초기화 해주어야 함.
            }
        })
    }

    // 댓글을 삭제하는 메소드
    deleteComment(commentId) {
        // comment_id를 가지고 요청을 보내야하는데, comment_id는 각 댓글의 삭제 버튼을
        // 눌렀을 때, 그 댓글의 정보에서 id를 찾아 보내주면 된다.
        axios.delete("http://localhost:4000/comment/comment", {
            params: commentId
        }).then((res) => {
        })
    }

    btnOnDisplay() {
        const fixAndDelete = document.getElementsByClassName("post-btn-display")[0];
        fixAndDelete.style.display = "block";
    }

    updateInputOnDisplay() {
        const updateInput = document.getElementsByClassName("update-input-display")[0];
        if (updateInput.style.display === "none") {
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
        const { userId } = this.props;
        const { currentPost, currentComment } = this.state;
        return (
            <div id="detailpage-container">
                <div>
                    <img className="logo-medium" src={sqriteLogo} />
                </div>
                <div className="detail-content-box-flex">
                    <div className="detail-q-title-box">

                        <h1 className="detail-q-title">안녕하세요, 질문이 있습니다. {this.props.postId} </h1>
                        <span style={{ display: "none" }} className="post-btn-display">
                            <button onClick={() => this.updateInputOnDisplay()}>MODIFY</button>
                            <button onClick={() => this.deletePost()}>DELETE</button>
                        </span>
                        <div className="detail-title-detail">
                            <span>Question from Gwan-Woo-Jeong</span><br></br>
                            <span>{currentPost.created_at}</span>
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
                                defaultValue={this.state.currentPost.content}
                                onChange={(e) => this.handleUpdateInput(e)}
                            ></textarea>
                            <button onClick={() => this.updatePost()}>
                                UPDATE
                            </button>
                        </div>
                    </div>
                    <div >
                        {currentComment.map(el =>
                            <div>
                                <div className="detail-a-title-box">
                                    <h2 className="detail-a-title">{el.title}</h2>
                                </div>
                                <div className="detail-title-detail">
                                    <span>Answer from Bo-Sung-Kim</span><br></br>
                                    <span>{el.created_at}</span>
                                </div>
                                {
                                    el.user_id !== userId
                                        ?
                                        <button onClick={() => this.deleteComment(el.id)}>DELETE</button>
                                        :
                                        null
                                }
                                <div className="detail-content">
                                    {el.content}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative detail-padding">
                        <textarea id="detail-textarea" placeholder="질문에 대한 의견을 공유해주세요!"></textarea>
                        <button id="answer-btn">Submit</button>
                    </div>
                </div >
            </div >
        )
    }
};

export default withRouter(Detailpage);