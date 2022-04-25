import React from 'react';
import { useNavigate } from "react-router-dom";
import GetAllCourses from '../components/GetAllCourses';

function CourseListings() {
    const navigate = useNavigate();
    console.log(document.cookie);

    function getCookieValue(name) {
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    function goBack() {
        let role = getCookieValue("role");
        if (role == "") { navigate("/"); }
        else if (role == "prof") { navigate("/professordashboard"); }
        else if (role == "stud") { navigate("/studentdashboard"); }
    }

    return (
        <>
        <h2>Course Listings</h2>
        <GetAllCourses />
        <button onClick={goBack}>Go Back</button>
        </>
    );
}

export default CourseListings;
