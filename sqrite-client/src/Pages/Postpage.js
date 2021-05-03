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
    handleSubmit(callback) {
        axios.post("http://localhost:4000/post/content", {
            email: this.props.userinfo.email,
            title: this.state.title,
            content: this.state.content
        },{
            headers:{'Authorization': `Bearer ${this.props.accessToken}`}
        },{
            withCrendentials : true
        })
            .then(res => {
                this.props.history.push(`/detail/${res.data.id}`) // !생성된 게시글로 이동, 서버 수정 필요
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div>
                    제목
                    <textarea
                        id="post-title-textarea"
                        placeholder="제목을 입력해주세요"
                        onChange={this.handleInputValue("title")}
                    />
                </div>
                <div>
                    내용
                    <textarea
                        id="post-content-textarea"
                        placeholder="내용을 입력해주세요"
                        onChange={this.handleInputValue("content")}
                    />
                </div>
                <button id="post-submit-btn" onClick={() => { this.handleSubmit(this.props.setPostId) }}>Submit</button>
            </div>
        )
    }
};

export default withRouter(Postpage);