import React, { Component } from 'react';

class Schedule extends Component {
    constructor(props){
        super(props);
        this.state = {
            allPossibleTimes: [480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110],
            allPossibleDisplayTimes: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"],
            myCourseTimes:[ [[{name: "Calculus 2"}, {name: "Calculus 3"}], [], [{name: "Calculus 2"}], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]], //each array is a time slot, each time slot contains an array of days of the week
        }
        this.getMyCourses = this.getMyCourses.bind(this);
    }

    // https://javascript.info/cookie
    getCookieValue(name){
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));

        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    getMyCourses(){
        let name = this.getCookieValue("user");
        // retrieve the courses
        // const result = await fetch('http://localhost:5000/api/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         loginName,
        //         password,
        //         isProf: prof
        //     })
        // }).then((res) => res.json());

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
