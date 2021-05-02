import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import autosize from 'autosize'

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPost: {
                id: null,
                title: "",
                content: "",
                count_comments: 0,
                count_likes: 0,
                created_at: "",
                user_id: "5"
            },
            currentComment: [
                {
                    id: null,
                    content: "",
                    count_comments: 0,
                    count_likes: 0,
                    created_at: "",
                    user_id: "",
                    post_id: ""
                },
                {
                    id: null,
                    content: "",
                    count_comments: 0,
                    count_likes: 0,
                    created_at: "",
                    user_id: "",
                    post_id: ""
                },
            ],
            updatePostInput: "",
            commentInput: ""
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
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
        if (window.confirm('게시물을 삭제하시겠습니까?')) {
            // 게시물을 삭제하는 요청을 서버에 보낸다.
            // 그리고 게시물을 삭제했다면, 메인페이지로 이동하고 alert를 이용해 삭제가 완료되었음을 알린다.
            axios.delete("http://localhost:4000/post/content", {
                params: {
                    postId
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

    handleSubmit(e) {
        e.preventDefault();
        const { userinfo, postId } = this.props;
        axios.post("http://localhost:4000/comment/comment", {
            user_id: userinfo.id,
            post_id: postId,
            content: this.state.commentInput
        })
            .then(res => console.log(res))
            .then(window.location.reload())
            .catch(err => console.log(err))
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
                            <span>2021-04-25</span>
                        </div>
                    </div>
                    <div className="detail-padding">
                        <div className="detail-content">
                            안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다.
                            안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다.
                            안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다.
                            안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다.
                            안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다.
                            안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다.
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
                        <div className="detail-padding">
                            <div className="detail-a-title-box">
                                <h2 className="detail-a-title">Re : 안녕하세요, 질문이 있습니다.</h2>
                            </div>
                            <div className="detail-title-detail">
                                <span>Answer from Jung-Jin-Young</span><br></br>
                                <span>2021-04-25</span>
                            </div>
                            <div className="detail-content">
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="detail-padding">
                            <div className="detail-a-title-box">
                                <h2 className="detail-a-title">Re : 안녕하세요, 질문이 있습니다.</h2>
                            </div>
                            <div className="detail-title-detail">
                                <span>Answer from Bo-Sung-Kim</span><br></br>
                                <span>2021-04-25</span>
                            </div>
                            <div className="detail-content">
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                                안녕하세요, 답변입니다. 안녕하세요, 답변입니다. 안녕하세요, 답변입니다.
                            </div>
                        </div>
                    </div>
                    <div className="relative detail-padding">
                        <textarea id="detail-textarea" placeholder="질문에 대한 의견을 공유해주세요!" onChange={(e) => this.handleCommentInput(e)} ></textarea>
                        <button id="answer-btn" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(Detailpage);