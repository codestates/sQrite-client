import React from "react";
import { withRouter } from "react-router-dom";
import sqriteLogo from "../sqrite-logo.png"

function Loginon(props) {
    return (
        <div id="login" class="w-1/2 flex flex-col justify-center text-center shadow-inner items-center">
            <div class="max-w-xs flex justify-center">
                <img className="logo-medium" src={sqriteLogo} class="max-w-xs flex justify-center top-1/3 left-1/3 mb-8" />
            </div>
            <div className="login-active" class="text-center top-1/3 left-1/3">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div >
                        <div class="text-left text-gray-600">EMAIL </div>
                        <input
                            type="email"
                            onChange={props.handleInputValue("email")}
                            class="border-2 border-light-gray-500 rounded-md outline-none p-1"
                        ></input>
                    </div>
                    <div>
                        <div class="text-left mt-2 text-gray-600">PASSWORD </div>
                        <input
                            type="password"
                            onChange={props.handleInputValue("password")}
                            class="border-2 border-light-gray-500 rounded-md outline-none p-1"
                        ></input>
                    </div>
                    <button
                        className="btn-login"
                        type='submit'
                        onClick={() => props.handleLogin()}
                        class="bg-sqrite-green text-white p-3 rounded-md mt-7 hover:bg-green-600 hover:text-gray-400"
                    >
                        LOGIN
                            </button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Loginon);