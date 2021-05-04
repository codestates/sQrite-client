import React from "react";
import { Link } from "react-router-dom";

function Mypagepreview(props) {
    let id;
    let createdAt;
    let title;

    if (props.myData.count_like === undefined) {
        title = props.myData.content;
        createdAt = props.myData.createdAt;
        id = props.myData.post_id;
    } else {
        title = props.myData.title;
        createdAt = props.myData.createdAt;
        id = props.myData.id;
    }
    return (
        <div className="mylists-container">
            <div className="mylists-content">
                {<Link to={`/detail/${id}`} className="mylists-content-title" >{title}</Link>}
                <span className="mylists-content-tag">태그1</span>
                <span className="mylists-content-tag">태그2</span>
                <span className="mylists-content-tag">태그3</span>
                <div className="mylists-content-detail">{createdAt.split("T")[0]}</div>
            </div>
        </div>
    )
}

export default Mypagepreview;