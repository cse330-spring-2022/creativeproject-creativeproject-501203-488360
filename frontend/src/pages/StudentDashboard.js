import React from 'react';
import Schedule from '../components/Schedule';
import Worksheet from '../components/Worksheet';
import CourseSearchArea from '../components/CourseSearchArea';
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate();
    console.log(document.cookie);

    function handleLogout(){
        // https://reactrouter.com/docs/en/v6/api#navigate
        document.cookie = "user="
        document.cookie = "role="
        navigate('/');
    }
    
    function goToCourseListings() {
        navigate('/courselistings');
    }

    return (
        <>
        <h2>Student Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
        <CourseSearchArea />
        <Worksheet />
        <Schedule />
        <button onClick={goToCourseListings}>Go to Course Listings</button>
        </>
    );
}

export default StudentDashboard;
