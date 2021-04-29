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
            <div>
                <h1>Sign Up / Sign In</h1>
            </div>
        )
    }
}

export default withRouter(Signpage);