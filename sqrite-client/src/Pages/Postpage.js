import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import autosize from 'autosize'

class Postpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: ""
        };
    };

    componentWillMount() {
        this.props.hideNav();
    }

    componentWillUnmount() {
        this.props.hideNav();
    }

    componentDidMount() {
        const postTitleTextarea = document.getElementById("post-title-textarea");
        const postContentTextarea = document.getElementById("post-content-textarea");
        postTitleTextarea.focus();
        postContentTextarea.focus();
        autosize(postTitleTextarea);
        autosize(postContentTextarea);
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    // submit 버튼을 누르면 생성된 게시글로 이동
    handleSubmit() {
        axios.post("http://localhost:4000/post/content", {
            email: this.props.userinfo.email,
            title: this.state.title,
            content: this.state.content
        }, {
            withCrendentials: true
        })
            .then(res => {
                this.props.history.push(`/detail/${res.data.id}`)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div class="space-y-6 mt-24">
                <div id="logo-area" class="flex justify-center align-middle">
                    <Link to="/"><img className="logo-medium" src={sqriteLogo} class="max-h-56" /></Link>
                </div>
                <div className="postpage" class="max-w-2xl mx-auto">
                    <div id="postpage-post" class="shadow-xl rounded-md" >
                        <div class="bg-sqrite-green p-3.5 mt-14">
                            <textarea
                                id="post-title-textarea"
                                placeholder=" 제목을 입력해주세요"
                                onChange={this.handleInputValue("title")}
                                class="w-full p-2 outline-none"
                            />
                        </div>
                        <div class="bg-white p-3.5">
                            <textarea
                                id="post-content-textarea"
                                placeholder="내용을 입력해주세요"
                                onChange={this.handleInputValue("content")}
                                class="border-solid border border-gray pad1 max-w-full p-2 h-80 outline-none"
                            />
                        </div>
                    </div>
                    <div id="submit-btn-area" class="top-auto flex justify-center align-middle">
                        <button id="post-submit-btn" onClick={() => this.handleSubmit()} class="bottom-12 bg-sqrite-green text-white p-3 animate-pulse rounded-md mt-9">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(Postpage);