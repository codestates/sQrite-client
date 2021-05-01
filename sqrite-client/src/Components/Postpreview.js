import React from "react";

function Postpreview(props) {
    const { title, created_at, username, id } = props.postData;
    const { handlePostClick } = props;
    return (
        <div className="question-preview">
            <div className="qp-flex-left">
                <span>solved!</span>
            </div>
            <div className="qp-flex-mid">
                <a className="qp-title" onClick={() => handlePostClick(id)}>{title}</a>
                <span className="qp-tag">태그1</span>
                <span className="qp-tag">태그2</span>
                <span className="qp-tag">태그3</span>
                <span className="qp-tag">태그3</span>
                <div className="qp-detail">
                    <span>{created_at} by {username}</span>
                </div>
            </div>
            <div className="qp-flex-right">
            </div>
        </div>
    )
}

export default Postpreview;