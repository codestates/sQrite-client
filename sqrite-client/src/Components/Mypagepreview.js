import React from "react";
import { Link } from "react-router-dom";

function Mypagepreview(props) {
    const { title, createdAt, id } = props.myData;
    return (
        <div className="mylists-container">
            <div className="mylists-content">
                {<Link to={`/detail/${id}`} className="mylists-content-title" >{title}</Link>}
                <span className="mylists-content-tag">태그1</span>
                <span className="mylists-content-tag">태그2</span>
                <span className="mylists-content-tag">태그3</span>
                <div className="mylists-content-detail">{createdAt}</div>
            </div>
        </div>
    )
}

export default Mypagepreview;