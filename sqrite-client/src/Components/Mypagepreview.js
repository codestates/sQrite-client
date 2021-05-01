import React from "react";
import { Link } from "react-router-dom";

function Mypagepreview(props) {
    const { title, created_at, id } = props.myData;
    const { handlePostClick } = props;
    return (
        <div className="mylists-container">
            <div className="mylists-content">
                {<Link to={'/detail'} className="mylists-content-title" onClick={() => handlePostClick(id)}>{title}</Link>}
                <span className="mylists-content-tag">태그1</span>
                <span className="mylists-content-tag">태그2</span>
                <span className="mylists-content-tag">태그3</span>
                <div className="mylists-content-detail">{created_at}</div>
            </div>
        </div>
    )
}

export default Mypagepreview;