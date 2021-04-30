import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"

class Mypage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div id="mypage-container">
                <div className="logo-box-flex">
                    <img className="logo-medium" src={sqriteLogo} />
                </div>
                <div className="content-box-flex">
                    <div className="myinfo-box">
                        <div className="myinfo">
                            <div>내 정보</div>
                            <div>이메일</div>
                            <div>유저이름</div>
                            <div>가입날짜</div>
                            <div>질문 개수</div>
                            <div>답변 개수</div>
                        </div>
                    </div>
                    <div className="mylists-box">
                        <div className="mylists">
                            <div className="mylists-flex">
                                <div className="mylists-title">
                                    <span>My Questions</span>
                                </div>
                                <div className="mylists-container">
                                    <div className="mylists-content">
                                        <a className="mylists-content-title">안녕하세요, 질문있습니다.</a>
                                        <span className="mylists-content-tag">태그1</span>
                                        <span className="mylists-content-tag">태그2</span>
                                        <span className="mylists-content-tag">태그3</span>
                                        <div className="mylists-content-detail">2021-04-25</div>
                                    </div>
                                </div>
                                <div className="mylists-container">
                                    <div className="mylists-content">
                                        <a className="mylists-content-title">안녕하세요, 질문있습니다.</a>
                                        <span className="mylists-content-tag">태그1</span>
                                        <span className="mylists-content-tag">태그2</span>
                                        <span className="mylists-content-tag">태그3</span>
                                        <div className="mylists-content-detail">2021-04-25</div>
                                    </div>
                                </div>
                                <div className="mylists-container">
                                    <div className="mylists-content">
                                        <a className="mylists-content-title">안녕하세요, 질문있습니다.</a>
                                        <span className="mylists-content-tag">태그1</span>
                                        <span className="mylists-content-tag">태그2</span>
                                        <span className="mylists-content-tag">태그3</span>
                                        <div className="mylists-content-detail">2021-04-25</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mylists-flex">
                                <div className="mylists-title">
                                    <span>My Answers</span>
                                </div>
                                <div className="mylists-container">
                                    <div className="mylists-content">
                                        <a className="mylists-content-title">안녕하세요, 답변입니다.</a>
                                        <span className="mylists-content-tag">태그1</span>
                                        <span className="mylists-content-tag">태그2</span>
                                        <span className="mylists-content-tag">태그3</span>
                                        <div className="mylists-content-detail">2021-04-25</div>
                                    </div>
                                </div>
                                <div className="mylists-container">
                                    <div className="mylists-content">
                                        <a className="mylists-content-title">안녕하세요, 답변입니다.</a>
                                        <span className="mylists-content-tag">태그1</span>
                                        <span className="mylists-content-tag">태그2</span>
                                        <span className="mylists-content-tag">태그3</span>
                                        <div className="mylists-content-detail">2021-04-25</div>
                                    </div>
                                </div>
                                <div className="mylists-container">
                                    <div className="mylists-content">
                                        <a className="mylists-content-title">안녕하세요, 답변입니다.</a>
                                        <span className="mylists-content-tag">태그1</span>
                                        <span className="mylists-content-tag">태그2</span>
                                        <span className="mylists-content-tag">태그3</span>
                                        <div className="mylists-content-detail">2021-04-25</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mypage;