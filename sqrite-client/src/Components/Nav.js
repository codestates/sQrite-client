import React from "react";
import { Link, withRouter } from "react-router-dom";
import sqriteLogo from "../sqrite-logo.png"

function Nav(props) {
    const { isLogin, handleLogout } = props;
    return (
        <div className="px-8 max-w-2xl mx-auto flex justify-between relative py-6">
            {isLogin === true ?
                <>
                    <Link to="/"><img className="w-48" src={sqriteLogo} /></Link>
                    <span className="absolute right-12 bottom-12">
                        <Link to="/post" className="border-sqrite-green border-2 rounded-xl p-1 text-sqrite-green font-bold m-1 transition hover:bg-sqrite-green hover:text-white">
                            WRITE
                    </Link>
                        <span className="border-sqrite-red border-2 rounded-xl p-1 text-sqrite-red font-bold m-1 hover:bg-sqrite-red hover:text-white" onClick={() => handleLogout()}>LOGOUT</span>
                        <Link to="/myinfo" className="border-sqrite-yellow border-2 rounded-xl p-1 text-sqrite-yellow font-bold m-1 hover:bg-sqrite-yellow hover:text-white">MYPAGE</Link>
                    </span>
                </>
                :
                <>
                    <Link to="/"><img className="w-48" src={sqriteLogo} /></Link>
                    <Link to="/sign" className="border-sqrite-green border-2 rounded-xl p-1 text-sqrite-green font-bold mr-10 absolute right-12 bottom-12 hover:bg-sqrite-green hover:text-white">LOGIN</Link>
                </>
            }
        </div>
    )
}

export default withRouter(Nav);