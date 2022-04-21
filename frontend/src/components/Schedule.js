import React, { Component } from 'react';

class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            allPossibleTimes: [480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170],
            myCourseTimes:[ [[{name: "Calculus 2"}, {name: "Calculus 3"}], [], [{name: "Calculus 2"}], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]], //each array is a time slot, each time slot contains an array of days of the week
        }
        this.getMyCourses = this.getMyCourses.bind(this);
    }
    getMyCourses(){
        //retrieve the courses

        //add each course to myCourses

        //add the times to myCourses

    }
    render() {
        var myScheduleTimes = this.state.allPossibleTimes.map((item, i) =>(
            <tr key={i} id={i}>
                <td>{item}</td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][0].length > 1 ? 'yellow' : 'green'}}>
                    {this.state.myCourseTimes[i][0].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][1].length > 1 ? 'yellow' : 'green'}}>
                    {this.state.myCourseTimes[i][1].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][2].length > 1 ? 'yellow' : 'green'}}>
                    {this.state.myCourseTimes[i][2].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][3].length > 1 ? 'yellow' : 'green'}}>
                    {this.state.myCourseTimes[i][3].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][4].length > 1 ? 'yellow' : 'green'}}>
                    {this.state.myCourseTimes[i][4].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
            </tr>
        ))
        return (
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                </thead>
                <tbody>
                    {myScheduleTimes}
                    
                </tbody>
            </table>
        );
    }
}

export default Schedule;