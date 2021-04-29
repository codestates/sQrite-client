import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import '../App.css';
import sqriteLogo from "../sqrite-logo.png"

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };
    render() {
        return (
            <div id="mainpage-container">
                <div id="navbar">
                    <div className="logo-box">
                        <img className="logo-medium" src={sqriteLogo} />
                    </div >
                    <div className="login-box">
                        <span className="mypage">Mypage</span>
                        <button className="login-btn">Login</button>
                    </div>
                </div>
                <div className="content-box">
                    <div className="search-box">
                        <input placeholder="검색어를 입력해주세요" id="main-input"></input>
                    </div>
                    <ul className="question-list-box">
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>solved!</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>solved!</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>solved!</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>solved!</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>waiting</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>solved!</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>waiting</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>solved!</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>waiting</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                        <div className="question-preview">
                            <div className="qp-flex-left">
                                <span>solved!</span>
                            </div>
                            <div className="qp-flex-mid">
                                <a className="qp-title">안녕하세요, 질문이 있습니다.</a>
                                <span className="qp-tag">태그1</span>
                                <span className="qp-tag">태그2</span>
                                <span className="qp-tag">태그3</span>
                                <div className="qp-detail">
                                    <span>2021-04-29 by Gwan-Woo-Jeong</span>
                                </div>
                            </div>
                            <div className="qp-flex-right">
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
};

export default withRouter(MainPage);