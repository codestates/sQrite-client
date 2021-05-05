import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import autosize from 'autosize'
import fakeData from "../Components/test/fakeData"
import answer from "../answer.png"
import questionMark from "../questionMark.png"

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPost: null,
            currentComment: null,
            updatePostTitleInput: "",
            updatePostInput: "",
            commentInput: ""
        };
    };

    componentDidMount() {
        this.loadDetailPage();
    }

    async loadDetailPage() {
        await this.getDetailPage(this.props.match.params.postId);
        await this.postUserVerify(this.btnOnDisplay);
        const detailTextarea = document.getElementById("detail-textarea");
        const postUpdateTextarea = document.getElementById("post-update-textarea");
        const postUpdateTitleInput = document.getElementById("post-update-title-input");
        detailTextarea.focus();
        postUpdateTextarea.focus();
        postUpdateTitleInput.focus();
        autosize(detailTextarea);
        autosize(postUpdateTextarea);
        autosize(postUpdateTitleInput);
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
                data: {
                    post_id: this.props.match.params.postId
                }
            }, {
                headers: { 'Authorization': `Bearer ${this.props.accessToken}` }
            }).then((res) => {
                alert("게시물이 삭제되었습니다.");
                this.props.history.push("/");
            })
        }
    }

    handleCommentInput(e) {
        this.setState({ commentInput: e.target.value });
    }
    // 답글을 가져오는 메소드
    getComment() {
        axios.get("http://localhost:4000/comment/comment", {
            params: {
                user_id: this.props.userinfo.id,
                post_id: this.props.match.params.postId
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

    handleUpdateTitleInput = (e) => {
        this.setState({ updatePostTitleInput: e.target.value });
        console.log(this.state.updatePostTitleInput)
    }

    postUserVerify(callback) {
        console.log("post-userId :", this.state.currentPost.user_id, "userinfo-userId :", this.props.userinfo.id)
        if (this.state.currentPost.user_id === this.props.userinfo.id) {
            callback();
        } else {
            return;
        }
    }

    createComment() {
        axios.post("http://localhost:4000/comment/comment", {
            user_id: this.props.userinfo.id,
            post_id: this.props.match.params.postId,
            content: this.state.commentInput
        }, {
            headers: { 'Authorization': `Bearer ${this.props.accessToken}` }
        }, {
            withCrendentials: true
        })
            .then((res) => {
                if (res.status === 200) {
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
            data: { comment_id: commentId }
        }, {
            headers: { 'Authorization': `Bearer ${this.props.accessToken}` }
        }, {
            withCrendentials: true
        }).then((res) => {
            if (res) alert("정상적으로 삭제되었습니다.");
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
        const postUpdateTitle = document.getElementById("post-update-title");
        const postUpdateTitleInput = document.getElementById("post-update-title-input");
        const postUpdateTextarea = document.getElementById("post-update-textarea");
        const postUpdateContent = document.getElementById("post-update-content");
        if (updateInput.style.display === "none") {
            postUpdateTextarea.defaultValue = this.state.currentPost.content;
            postUpdateTitleInput.defaultValue = this.state.currentPost.title;
            postUpdateTitle.style.display = "none";
            postUpdateContent.style.display = "none";
            postUpdateTitleInput.style.display = "block";
            updateInput.style.display = "block";
        } else {
            postUpdateContent.style.display = "block";
            postUpdateTitle.style.display = "block";
            postUpdateTitleInput.style.display = "none";
            updateInput.style.display = "none";
        };
    }

    updatePost() {
        axios.put("http://localhost:4000/post/content", {
            post_id: this.props.match.params.postId,
            title: this.state.updatePostTitleInput,
            content: this.state.updatePostInput
        })
            .then(res => {
                if (res.status = 200) {
                    alert("수정되었습니다.")
                    window.location.reload();
                } else {
                    alert("오류가 발생하였습니다.")
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const { currentPost, currentComment } = this.state;
        if (!currentComment || !currentPost) {
            return (
                <div>loading...</div>
            )
        }
        return (
            <div className="max-w-2xl mx-auto mb-10">
                <div className="border-sqrite-green border-2 rounded-xl mb-5">
                    <div className="bg-sqrite-green flex p-3 pt-1 rounded-lg rounded-b-none relative overflow-hidden">
                        <div className="m-auto flex-shrink-0">
                            <img src={questionMark} className="h-12" />
                        </div>
                        <div className="flex-grow">
                            <div style={{ display: "none" }} className="post-btn-display text-right">
                                <button className="m-1 bg-sqrite-yellow text-white font-bold px-2 rounded-lg text-sm hover:bg-yellow-600"
                                    onClick={() => this.updateInputOnDisplay()}>FIX</button>
                                <button className="m-1 bg-sqrite-red text-white font-bold px-2 rounded-lg text-sm hover:bg-red-800"
                                    onClick={() => this.deletePost()}>DEL</button>
                            </div>
                            <h1 id="post-update-title" className="text-white mx-3 text-xl py-2">{currentPost.title}</h1>
                            <textarea
                                style={{ display: "none" }}
                                id="post-update-title-input"
                                onChange={(e) => this.handleUpdateTitleInput(e)}
                                className="border border-white text-white bg-sqrite-green p-3 rounded-xl mb-3 ml-3 outline-none w-3/5"></textarea>
                            <div className="text-white text-sm text-right">
                                by {currentPost.createdAt.split("T")[0]} {currentPost.user.username}
                            </div>
                        </div>
                    </div>
                    <div className="p-4 text-base">
                        <div id="post-update-content" className="detail-content">
                            {currentPost.content}
                        </div>
                        <div style={{ display: "none" }} className="detail-editing update-input-display overflow-hidden">
                            <textarea
                                id="post-update-textarea"
                                className="border border-gray-500 w-full p-3 rounded-xl mb-3 outline-none"
                                type='text'
                                onChange={(e) => this.handleUpdateInput(e)}
                            ></textarea>
                            <button
                                className="float-right border-sqrite-yellow border-2 rounded-xl p-1 text-sqrite-yellow font-bold hover:bg-sqrite-yellow hover:text-white"
                                onClick={() => this.updatePost()}>
                                UPDATE
                            </button>
                        </div>
                    </div>
                </div>

                <div >
                    {currentComment.map(eachComment =>
                        <div key={eachComment.id} className="border-sqrite-yellow border-2 rounded-xl flex relative mb-5 p-3 pt-1">
                            <img src={answer} className="h-12 m-auto" />
                            <div className="flex-grow">
                                {
                                    eachComment.user_id === this.props.userinfo.id
                                        ?
                                        <div className="text-right">
                                            <button className=" m-1 bg-sqrite-red text-white font-bold px-2 rounded-lg text-sm hover:bg-red-800"
                                                onClick={() => this.deleteComment(eachComment.id)}>DEL</button>
                                        </div>
                                        :
                                        null
                                }
                                <div className="py-2 mx-3">
                                    {eachComment.content}
                                </div>
                                <div className="text-right text-gray-500 text-sm">
                                    by {eachComment.user.username} {eachComment.createdAt.split("T")[0]}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative border-gray-400 border-2 p-4 rounded-xl overflow-hidden">
                    <textarea
                        id="detail-textarea"
                        className="w-full outline-none"
                        placeholder="질문에 대한 의견을 공유해주세요!"
                        onChange={(e) => this.handleCommentInput(e)}>
                    </textarea>
                    <button className="float-right rounded-xl p-1 text-sqrite-green font-bold m-1 transition hover:bg-sqrite-yellow hover:text-white"
                        onClick={() => this.createComment()}>Submit</button>
                </div>
            </div>
        )
    }
};

export default withRouter(Detailpage);