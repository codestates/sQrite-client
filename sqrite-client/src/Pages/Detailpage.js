import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import autosize from 'autosize'

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPost: null,
            currentComment: null,
            isMine : false
        };
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
    // 우선 유저의 아이디를 가져왔다는 가정 하에 진행해보자.
    userConfirm(){

        this.setState({
            isMine : true
        })
    }

    render() {
        return (
            <div id="detailpage-container">
                <div>
                    <img className="logo-medium" src={sqriteLogo} />
                </div>
                <div className="detail-content-box-flex">
                    <div className="detail-q-title-box">
                        <h1 className="detail-q-title">안녕하세요, 질문이 있습니다.</h1>
                        { this.state.isMine === true 
                        ? <button>MODIFY</button>
                        : null
                        }
                        { this.state.isMine === true 
                        ? <button>DELETE</button>
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
                        <textarea id="detail-textarea" placeholder="질문에 대한 의견을 공유해주세요!"></textarea>
                        <button id="answer-btn">Submit</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(Detailpage);