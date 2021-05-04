import React from "react";
import { Link } from "react-router-dom";

function Postpreview(props) {
    const { title, createdAt, id, user } = props.postData;
    return (
        <div className="question-preview">
            <div className="qp-flex-left">
                <span>solved!</span>
            </div>
            <div className="qp-flex-mid">
                {<Link to={`/detail/${id}`} className="qp-title">{title}</Link>}
                <span className="qp-tag">태그1</span>
                <span className="qp-tag">태그2</span>
                <span className="qp-tag">태그3</span>
                <div className="qp-detail">
                    <span>{createdAt.split("T")[0]} by {user.username}</span>
                </div>
            </div>
            <div className="qp-flex-right">
            </div>
        </div>
    )
}

export default Postpreview;