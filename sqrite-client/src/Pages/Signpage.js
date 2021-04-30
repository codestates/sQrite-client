import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Signpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div id="signpage-container">
                <div className="signpage-flex-box">
                    <div>
                        Sign In
                    </div>
                </div>
                <div className="signpage-flex-box">
                    <div>
                        Sign Up
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signpage);