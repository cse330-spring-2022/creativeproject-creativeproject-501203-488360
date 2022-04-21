import React, { Component } from 'react';

class Worksheet extends Component {
    constructor(props){
        super(props);
        this.getMyCourses = this.getMyCourses.bind(this);
        this.state = {
            myCourses: [
                {code: "MATH", number: 102, name: "Calculus 2", sessions: "TBD"},
                {code: "MATH", number: 200, name: "Calculus 3", sessions: "TBD"}
            ], //an array of objects with course info
            myCourseTimes:[], //an array of arrays corresponding to the time in each course
        }
    }

    //fetch the courses the user has already added to their sheet 
    getMyCourses(){

    }
    render() {

        var classes = this.state.myCourses.map((item, i) => (
            <tr key={i}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.number}</td>
                <td>{item.sessions}</td>
            </tr>
        ))

        return (
            <div>
                My Courses
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department Code</th>
                            <th>Course Number</th>
                            <th>Course Sessions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes}
                    </tbody>
                    
                </table>
            </div>
        );
    }
}

export default Worksheet;