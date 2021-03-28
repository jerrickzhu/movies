import React from "react";
import { NavLink } from "react-router-dom";

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <h1>Sorry! We couldn't find the movie you're looking for.</h1>
                <br></br>
                <br></br>
                <br></br>
                <NavLink to='/'>
                    <h1>Click here to go back to the search page.</h1>
                </NavLink>
            </div>
        )
    }
}