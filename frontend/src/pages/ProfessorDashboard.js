import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import ProfessorAddCourse from '../components/ProfessorAddCourse';
import ProfessorsCourses from '../components/ProfessorsCourses';

function ProfessorDashboard() {
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

    function LoggedInAs() {
        return getCookieValue("user");
    }

    function handleLogout() {
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
        <h2>Professor Dashboard</h2>

        {/* https://reactjs.org/docs/faq-functions.html */}
        <p>Logged in as: <b><LoggedInAs /></b> <button onClick={handleLogout}>Logout</button></p>

        <ProfessorAddCourse />
        <ProfessorsCourses />
        <button onClick={goToCourseListings}>Go to Course Listings</button>
        </>
    );
}

export default ProfessorDashboard;
