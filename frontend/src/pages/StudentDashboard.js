import React, { Component } from 'react';
import Schedule from '../components/Schedule';
import Worksheet from '../components/Worksheet';
import CourseSearchArea from '../components/CourseSearchArea';


class StudentDashboard extends Component {
    render() {
        return (
            <>
            <div>
                Student Dashboard
            </div>
            <CourseSearchArea />
            <Worksheet />
            <Schedule />
            </>
        );
    }
}

export default StudentDashboard;