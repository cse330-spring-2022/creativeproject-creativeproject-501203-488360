import React from 'react';
import Schedule from '../components/Schedule';
import Worksheet from '../components/Worksheet';
import CourseSearchArea from '../components/CourseSearchArea';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function StudentDashboard(props) {
    const navigate = useNavigate();
    let path = props.path;
    console.log(path);

    function goToCourseListings() {
        navigate('/' + path);
    }

    return (
        <>
        <button onClick={goToCourseListings}>Go to Course Listings</button>
        </>
    );
}

export default StudentDashboard;
