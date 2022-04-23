import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import ProfessorsCourses from '../components/ProfessorsCourses';

class ProfessorDashboard extends Component {
    handelLogout() {
        // https://reactrouter.com/docs/en/v6/api#navigate
        document.cookie = "";
        <Navigate to="/" replace={true} />
    }
    
    render() { // on page load
        console.log(document.cookie);

        return (
            <>
            <h1>Professor Dashboard</h1>

            {/* https://reactjs.org/docs/faq-functions.html */}
            <button onClick={this.handelLogout}>Logout</button>

            <ProfessorsCourses />
            </>
        );
    }
}

export default ProfessorDashboard;
