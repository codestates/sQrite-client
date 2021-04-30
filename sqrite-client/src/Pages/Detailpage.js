import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import autosize from 'autosize'

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : null,
            comments : null
        };
    };

    getContent(){
        const { postId } = this.props;
        axios.get("http://localhost:4000/getContent",{
            postId
        })
        .then((res)=>{
            if(res){
                this.setState({
                    post : res.data
                })
            }
        })
        .catch((err)=>{
        })
    }

    getComments(){
        const { postId } = this.props;
        axios.get("",)
    }


    componentDidMount() {
        const detailTextarea = document.getElementById("detail-textarea");
        detailTextarea.focus();
        autosize(detailTextarea);
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