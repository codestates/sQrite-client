import React from "react";

function Mypagepreview(props) {
    const { title, created_at } = props;
    return (
        <div className="mylists-container">
            <div className="mylists-content">
                <a className="mylists-content-title">{title}</a>
                <span className="mylists-content-tag">태그1</span>
                <span className="mylists-content-tag">태그2</span>
                <span className="mylists-content-tag">태그3</span>
                <div className="mylists-content-detail">{created_at}</div>
            </div>
        </div>
    )
}

export default Mypagepreview;