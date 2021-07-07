import React from "react";
import { withRouter } from "react-router-dom";
import sqriteLogo from "../sqrite-logo.png"

function Signupon(props) {
    return (
        <div id="signup" class="w-1/2 flex flex-col justify-center align-middle items-center text-center shadow-inner">
            <div>
                <img className="logo-medium" src={sqriteLogo} class="max-w-xs justify-center mb-8" />
            </div>
            <div>
                <div className="signup-active" class="text-center top-1/3 left-1/3">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <div class="text-gray-600 text-left">EMAIL </div>
                            <input
                                type="email"
                                onChange={props.handleInputValue("email")}
                                class="rounded-md outline-none p-1 border-2 border-light-gray-500"
                            ></input>
                        </div>
                        <div>
                            <div class="text-gray-600 text-left mt-2">USERNAME </div>
                            <input
                                type="text"
                                onChange={props.handleInputValue("username")}
                                class="rounded-md outline-none p-1 border-2 border-light-gray-500"
                            ></input>
                        </div>
                        <div>
                            <div class="text-gray-600 text-left mt-2">PASSWORD </div>
                            <input
                                type="password"
                                onChange={props.handleInputValue("password")}
                                class="rounded-md outline-none p-1 border-2 border-light-gray-500"
                            ></input>
                        </div>
                        <div>
                            <div class="text-gray-600 text-left mt-2">CHECK PASSWORD </div>
                            <input
                                type="password"
                                onChange={props.handleInputValue("checkPassword")}
                                class="rounded-md outline-none p-1 border-2 border-light-gray-500"
                            ></input>
                        </div>
                        <button
                            className="btn-signup"
                            type='submit'
                            onClick={() => props.handleSignUp()}
                            class="bg-sqrite-green text-white p-3 rounded-md mt-7 hover:bg-green-600 hover:text-gray-400">
                            SIGNUP
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Signupon);