import React from "react";
import { withRouter } from "react-router-dom";
import sqriteRevertedLogo from "../sqrite_reverted.png";

function Loginoff(props) {
    return (
        <div id="login" class="w-1/2 bg-sqrite-green flex flex-col justify-center text-center shadow-inner items-center">
            <div class="max-w-xs flex justify-center">
                <img className="logo-medium" src={sqriteRevertedLogo} class="max-w-xs flex justify-center top-1/3 left-1/3 mb-8" />
            </div>
            <div>
                <button onClick={() => props.handleDefault()} class="text-center top-1/2 left-1/3 focus:outline-none bg-sqrite-yellow text-white font-bold p-3 rounded-md hover:bg-yellow-500 hover:text-gray-300 mt-7">
                    LOGIN
                </button>
            </div>
        </div>
    )
}

export default withRouter(Loginoff);