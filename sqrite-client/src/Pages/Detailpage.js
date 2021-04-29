import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <h1>Detail Page</h1>
                <button>Login</button>
            </div>
        )
    }
};

export default withRouter(Detailpage);