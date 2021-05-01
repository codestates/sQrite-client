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
                content: "안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다. 안녕하세요, 질문이 있습니다."
            },
            currentComment: null,
            admin: true,
            isupdating: false
        };
        this.handleUpdateValue = this.handleUpdateValue.bind(this);
    };

    componentDidMount() {
        const detailTextarea = document.getElementById("detail-textarea");
        detailTextarea.focus();
        autosize(detailTextarea);
        // this.getDetailPage(this.props.postId);
    }

    async getDetailPage(postId) {
        const getCurrentPost = await axios.get(`http://localhost:4000/post/content?post_id=${postId}`);
        const getCurrentComment = await axios.get(`http://localhost:4000/comment/comment?post_id=${postId}`);
        this.setState({ currentPost: getCurrentPost, currentComment: getCurrentComment });
    }

    // post의 userId와, 현재 유저의 id가 일치하는지 확인하고, 만약 일치한다면
    // 유저가 게시물을 수정/삭제 할 수 있도록 버튼이 나타나게 한다.
    // 그렇다면 유저의 id를 처음 로그인 할 때부터 가져와야 할 필요가 있을 듯.

    // 우선 유저의 아이디를 가져왔다는 가정 하에 작성해보자!
    adminConfirm() {
        const { userId, postId } = this.props;
        if (userId === postId) {
            this.setState({
                admin: true
            })
        }
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

    // 수정을 할 수 있는 상태가 되도록 활성화 시켜준다.
    updateActivate() {
        this.setState({
            isupdating: true
        })
    }

    handleCommentInput(e) {
        this.setState({ commentInput: e.target.value });
        console.log(this.state.commentInput);
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

    handleUpdateValue = (e) => {
        this.setState({
            currentPost: {
                content: e.target.value
            }
        });
    }

    updatePost() {
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
                        {
                            this.state.admin === true
                                ? <button onClick={() => this.updateActivate()}>MODIFY</button>
                                : null
                        }
                        {
                            this.state.admin === true
                                ? <button onClick={() => this.deletePost()}>DELETE</button>
                                : null
                        }
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
                        {
                            this.state.isupdating === true
                                ?
                                <div className="detail-editing">
                                    <input
                                        type='text'
                                        defaultValue={this.state.currentPost.content}
                                        onChange={this.handleUpdateValue()}
                                    ></input>
                                    <button onClick={() => this.handleDefault()}>
                                        UPDATE
                            </button>
                                </div>
                                : null
                        }
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