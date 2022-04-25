import React, { Component } from 'react';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPossibleTimes: [480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170],
            myCourseTimes:[ [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]], //each array is a time slot, each time slot contains an array of days of the week
        }
        this.getMyCourses = this.getMyCourses.bind(this);
    }

    componentDidMount(){
        this.getMyCourses();
    }

    // https://javascript.info/cookie
    getCookieValue(name) {
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));

        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    displayTime(minute) {
        let hh = parseInt(minute/60).toString().padStart(2, '0');
        let mm = (minute%60).toString().padStart(2, '0');
        return hh + ":" + mm;
    }

    async getMyCourses() {
        let name = this.getCookieValue("user");
        // retrieve the courses
        const result = await fetch('http://localhost:5000/api/studentCourse/getCourseByStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stud: name
            })
        }).then((res) => res.json());

        //add each course to myCourses
        console.log("MY COURSES ARE");
        console.log(result);

        let tempMyCourseTimes = this.state.myCourseTimes;
        // console.log(result);
        for (let i = 0; i < result.length; i++){

            // calculate the time
            let timeIndex = (result[i].startTime - 480) / 30;

            //add to schedule based on day of the week
            if (result[i].sessions == "Mon-Wed"){
                tempMyCourseTimes[timeIndex][0].push({name: result[i].name});
                tempMyCourseTimes[timeIndex][2].push({name: result[i].name});
                //courses last 50 minutes so extend the course to the next time slot
                tempMyCourseTimes[timeIndex + 1][0].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 1][2].push({name: result[i].name});

            }else if (result[i].sessions == "Tue-Thu"){
                tempMyCourseTimes[timeIndex][1].push({name: result[i].name});
                tempMyCourseTimes[timeIndex][3].push({name: result[i].name});
                //courses last 50 minutes so extend the course to the next time slot
                tempMyCourseTimes[timeIndex + 1][1].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 1][3].push({name: result[i].name});

            }
            
        }

        // replace state
        this.setState({
            myCourseTimes: tempMyCourseTimes
        }, () => {
            console.log("MY COURSE STATE IS ");
            console.log(this.state.myCourseTimes);
        })
    }

    render() {
        var myScheduleTimes = this.state.allPossibleTimes.map((item, i) =>(
            <tr key={i} id={i}>
                <td>{this.displayTime(item)}</td>
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
