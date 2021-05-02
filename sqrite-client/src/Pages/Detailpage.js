import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"
import autosize from 'autosize'
import fakeData from "../Components/test/fakeData"

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPost: fakeData.allPost[0],
            currentComment: fakeData.commentData,
            admin : true,
            isUpdating: false
        };
        this.handleUpdateValue = this.handleUpdateValue.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
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
    adminConfirm(){
        const { userId, postId } = this.props;
        if(userId===postId){
            this.setState({
                admin : true
            })
        }
    }

    // 게시물 삭제 메소드
    deletePost(){
        const { postId } = this.props;
        if (window.confirm("게시물을 삭제하시겠습니까?")) {
            // 게시물을 삭제하는 요청을 서버에 보낸다.
            // 그리고 게시물을 삭제했다면, 메인페이지로 이동하고 alert를 이용해 삭제가 완료되었음을 알린다.
            axios.delete("http://localhost:4000/post/content",{
                params : {
                    post_id : postId
                }
            }).then((res)=>{
                alert("게시물이 삭제되었습니다.")
                this.props.history.push("/");
            })
        }
    }

    // 게시물 내용을 수정을 할 수 있는 상태가 되도록 활성화 시켜준다.
    updateActivate(){
        this.setState({
            isUpdating : true
        })
    }

    // 입력창에 입력되는 값에 대해서 받아오는 메소드
    handleUpdateValue = (e) => {
        const { content, comment } = this.state;
        this.setState ({
            currentPost : {
                content : e.target.value
            } 
        });
    }

    // 게시물의 내용을 수정하고 업데이트 하는 메소드
    // input 폼 show/hide 하는 방식을 css로 처리하는 걸로...
    updatePost(){
    }

    // 답글을 가져오는 메소드
    getComment(){    
        const { userId, postId } = this.props;
        axios.get("http://localhost:4000/comment/comment",{
            params : {
                user_id : userId,
                post_id : postId
            }
        }
        ).then((res)=>{
            this.setState({
                currentComment : res.commentData
            })
        })
    }

    // 댓글을 작성하는 메소드
    createComment(){
        const { userId, postId } = this.props;
        axios.post("http://localhost:4000/comment/commen",{
            user_id : userId,
            post_id : postId,
            // content : input comment value...
        }).then((res)=>{
            if(res.status===200){ 
                // 정상적으로 댓글이 작성되고 데이터에 추가되었다면 댓글 입력창을 다시 초기화 해주어야 함.
            }
        })
    }

    // 댓글을 삭제하는 메소드
    deleteComment(commentId){
        // comment_id를 가지고 요청을 보내야하는데, comment_id는 각 댓글의 삭제 버튼을
        // 눌렀을 때, 그 댓글의 정보에서 id를 찾아 보내주면 된다.
        axios.delete("http://localhost:4000/comment/comment",{
            params : commentId
        }).then((res)=>{
        })
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
                        <h1 className="detail-q-title">{currentPost.title}</h1>
                        { 
                        this.state.admin === true 
                        ? <button onClick={()=>this.updateActivate()}>MODIFY</button>
                        : null
                        }
                        { 
                        this.state.admin === true 
                        ? <button onClick={()=>this.deletePost()}>DELETE</button>
                        : null
                        }
                        <div className="detail-title-detail">
                            <span>Question from Gwan-Woo-Jeong</span><br></br>
                            <span>{currentPost.created_at}</span>
                        </div>
                    </div>
                    <div className="detail-padding">
                        <div className="detail-content">
                            {currentPost.content}
                        </div>
                        { 
                        this.state.isupdating === true 
                        ? 
                        <div className="detail-editing">
                            <input
                            type='text'
                            defaultValue = {this.state.currentPost.content}
                            onChange={(e)=>this.handleUpdateValue(e)}
                            ></input>
                            <button onClick={()=>this.handleDefault()}>
                                UPDATE
                            </button>
                        </div>
                        : null
                        }
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
                            el.user_id!==userId
                            ?
                            <button onClick={()=>this.deleteComment(el.id)}>DELETE</button>
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
                </div>
            </div>
        )
    }
};

export default withRouter(Detailpage);