import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Postpreview from "../Components/Postpreview"
import fakeData from "../Components/test/fakeData" // for test

// 로그인 버튼을 클릭했을 때, signup/login 페이지로 이동할 수 있어야 함 
// 모든 post들을 가져와 리스트로 나열할 수 있도록 요청 전송

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPost: null,
            searchWord: ""
        };
        this.searchWord = this.searchWord.bind(this);
    };

    componentDidMount() {
        this.getAllPost();
    }

    async getAllPost() {
        const getAllPost = await axios.get("http://localhost:4000/post/content");
        console.log(getAllPost.data);
        this.setState({ allPost: getAllPost.data });
    }

    searchWord = (e) => {
        this.setState({
            searchWord: e.target.value
        });
    };

    render() {
        const { allPost, searchWord } = this.state;
        if (this.state.allPost === null) {
            return <div>loading...</div>
        }
        const filteredContent = allPost.filter(eachPost => {
            return eachPost.title.toLowerCase().includes(searchWord);
        })
        return (
            <div className="px-8 max-w-2xl mx-auto mb-10">
                <div className="my-6 mx-12 p-2 border-4 rounded-md border-sqrite-green">
                    <input
                        type="search"
                        placeholder="검색어를 입력해주세요"
                        onChange={this.searchWord}></input>
                </div>
                <div>
                    <ul className="border-t border-l border-r-4 border-b-8 border-sqrite-green rounded-3xl pt-1 pl-2 pr-2">
                        {filteredContent.map(eachPost => <Postpreview key={eachPost.id} postData={eachPost} />)}
                    </ul>
                </div>
            </div>
        )
    }
};

export default withRouter(MainPage);