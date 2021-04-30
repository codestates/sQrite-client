import React from "react";

function Postpreview(props) {
    const {title, created_at} = props;
    return (
        <div className="question-preview">
            <div className="qp-flex-left">
                <span>solved!</span>
            </div>
            <div className="qp-flex-mid">
                <a className="qp-title">{title}</a>
                <span className="qp-tag">태그1</span>
                <span className="qp-tag">태그2</span>
                <span className="qp-tag">태그3</span>
                <span className="qp-tag">태그3</span>
                <div className="qp-detail">
                    <span>{created_at} by Gwan-Woo-Jeong</span>
                </div>
            </div>
            <div className="qp-flex-right">
            </div>
        </div>
    )
}

export default Postpreview;