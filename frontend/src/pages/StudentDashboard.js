import React, { Component } from 'react';
import Schedule from '../components/Schedule';
import Worksheet from '../components/Worksheet';
import CourseSearchArea from '../components/CourseSearchArea';
import { useNavigate } from "react-router-dom";


function StudentDashboard() {

    const navigate = useNavigate();

    function handleLogout(){
        // https://reactrouter.com/docs/en/v6/api#navigate
        document.cookie = "user="
        document.cookie = "role="
        navigate('/');
    }
        
    return (
        <>
        <h1>Student Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        <CourseSearchArea />
        <Worksheet />
        <Schedule />
        </>
    );
}

export default StudentDashboard;
