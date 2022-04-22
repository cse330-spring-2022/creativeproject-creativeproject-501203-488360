import React, { Component } from 'react';
import ProfessorsCourses from '../components/ProfessorsCourses';

class ProfessorDashboard extends Component {
    render() {
        return (
            <>
                <div>
                    Professor Dashboard
                </div>
                <ProfessorsCourses />
            </>
        );
    }
}

export default ProfessorDashboard;