import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Postpreview from "../Components/Postpreview"
import findIcon from '../find.png'

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
        const getAllPost = await axios.get(`${process.env.REACT_APP_SERVER}/post/content`);
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
            return <div></div>
        }
        const filteredContent = allPost.filter(eachPost => {
            return eachPost.title.toLowerCase().includes(searchWord);
        })
        return (
            <div className="px-8 max-w-2xl mx-auto mb-10">
                <div className="my-6 mx-12 border-4 rounded-md border-sqrite-green bg-sqrite-green flex">
                    <div className="m-auto">
                        <img src={findIcon} className="h-7 ml-2 mr-4" />
                    </div>
                    <input
                        type="search"
                        placeholder="검색어를 입력해주세요"
                        className="w-full outline-none p-2 rounded-md"
                        onChange={this.searchWord} />
                </div>
                <ul className="border-t border-l border-r-4 border-b-8 border-sqrite-green rounded-3xl pt-1 pl-2 pr-2">
                    {filteredContent.length !== 0 ?
                        filteredContent.map(eachPost => <Postpreview key={eachPost.id} postData={eachPost} />)
                        : <div className="border-sqrite-green py-1 px-3 border-b text-gray-600">검색 결과가 없습니다.</div>}
                </ul>
            </div>
        )
    }
};

export default withRouter(MainPage);