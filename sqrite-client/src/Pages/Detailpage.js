import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import sqriteLogo from "../sqrite-logo.png"

class Detailpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div id="detailpage-container">
                <div className="logo-box-flex">
                    <img className="logo-medium" src={sqriteLogo} />
                </div>
                <div className="content-box-flex">

                </div>
            </div>
        )
    }
};

export default withRouter(Detailpage);