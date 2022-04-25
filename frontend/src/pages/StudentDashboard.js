import React from 'react';
import Schedule from '../components/Schedule';
import Worksheet from '../components/Worksheet';
import CourseSearchArea from '../components/CourseSearchArea';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function StudentDashboard() {
    const navigate = useNavigate();
    console.log(document.cookie);

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

    // https://reactjs.org/docs/conditional-rendering.html
    function LoggedInAs() {
        return getCookieValue("user");
    }

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
        <p>Logged in as: <b><LoggedInAs /></b> <button onClick={handleLogout}>Logout</button></p>
        <CourseSearchArea />
        <Worksheet />
        <Schedule />
        <button onClick={goToCourseListings}>Go to Course Listings</button>
        </>
    );
}

export default StudentDashboard;
