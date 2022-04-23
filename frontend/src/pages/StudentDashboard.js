import React, { Component } from 'react';
import Schedule from '../components/Schedule';
import Worksheet from '../components/Worksheet';
import CourseSearchArea from '../components/CourseSearchArea';

class StudentDashboard extends Component {
    render() {
        console.log(document.cookie);
        
        return (
            <>
            <h1>Student Dashboard</h1>
            <CourseSearchArea />
            <Worksheet />
            <Schedule />
            </>
        );
    }
}

export default StudentDashboard;
