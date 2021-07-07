import React from "react";
import { Link } from "react-router-dom";

function Postpreview(props) {
    const { title, createdAt, id, user } = props.postData;
    return (
        <Link to={`/detail/${id}`}>
            <div className="border-sqrite-green py-1 px-3 border-b hover:text-sqrite-yellow">
                <div className="qp-flex-mid">
                    { title }
                    <div className="text-sm text-right text-gray-500">
                        <span>{createdAt.split("T")[0]} by {user.username}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Postpreview;