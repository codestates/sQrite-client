import React from "react";
import { Link, withRouter } from "react-router-dom";
import sqriteLogo from "../sqrite-logo.png"
import sqriteRevertedLogo from "../sqrite_reverted.png";

function Signupoff(props) {
    return (
        <div id="signup" class="w-1/2 bg-sqrite-green flex flex-col justify-center align-middle items-center text-center shadow-inner">
            <div>
                <img className="logo-medium" src={sqriteRevertedLogo} class="max-w-xs justify-center mb-8" />
            </div>
            <div>
                <button onClick={props.handleDefault} class="text-center top-1/2 left-1/3 focus:outline-none bg-sqrite-yellow text-white font-bold p-3 rounded-md hover:bg-yellow-500 hover:text-gray-300" >
                    SIGNUP
                </button>
            </div>
        </div>
    )
}

export default withRouter(Signupoff);