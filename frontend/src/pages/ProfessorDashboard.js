import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import ProfessorAddCourse from '../components/ProfessorAddCourse';
import ProfessorsCourses from '../components/ProfessorsCourses';

function ProfessorDashboard(){
    const navigate = useNavigate();

    function handleLogout(){
        // https://reactrouter.com/docs/en/v6/api#navigate
        document.cookie = "user="
        document.cookie = "role="
        navigate('/');
    }
    return(
    <>
        <h1>Professor Dashboard</h1>

        {/* https://reactjs.org/docs/faq-functions.html */}
        <button onClick={handleLogout}>Logout</button>

        <ProfessorAddCourse />
        <ProfessorsCourses />
    </>
    );
}

export default ProfessorDashboard;
