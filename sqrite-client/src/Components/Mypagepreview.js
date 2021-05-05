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
        <div className="border-sqrite-green py-1 px-3 border-b hover:text-sqrite-yellow">
            <div className="qp-flex-mid">
                {<Link to={`/detail/${id}`} className="">{title}</Link>}
                <div className="text-sm text-right text-gray-500">
                    <span>{createdAt.split("T")[0]}</span>
                </div>
            </div>
        </div>
    )
}

export default Mypagepreview;