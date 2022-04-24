import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import ProfessorAddCourse from '../components/ProfessorAddCourse';
import ProfessorsCourses from '../components/ProfessorsCourses';

function ProfessorDashboard(){
    const navigate = useNavigate();
    console.log(document.cookie);

    // https://javascript.info/cookie
    function getCookieValue(name) {
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    useEffect(() => {
        let role = getCookieValue("role");
        if (role == "") { navigate("/"); }
    });

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
