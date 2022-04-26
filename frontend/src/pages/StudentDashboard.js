import React from 'react';
import Navigate from '../components/Navigate';
import { Component } from 'react';

class StudentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            myCourses: [], // an array of objects with course info
            myCourseTimes:[ [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]], //each array is a time slot, each time slot contains an array of days of the week
            allPossibleTimes: [480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170],
            allCourses: [],
            currentPath: "courselistings"
        }
        this.getCookieValue = this.getCookieValue.bind(this);
        this.LoggedInAs = this.LoggedInAs.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.getMyCourses = this.getMyCourses.bind(this);
        this.removeCourse = this.removeCourse.bind(this);
        this.getAllCourses = this.getAllCourses.bind(this);
        this.addThisCourse = this.addThisCourse.bind(this);
        this.courseInfo = this.courseInfo.bind(this);
    }

    componentDidMount() {
        let role = this.getCookieValue("role");
        if (role == "") {
            this.setState({
                currentPath: ""
            }, () => {
                document.getElementById("navigation").click();
                this.setState({
                    currentPath: "studentdashboard"
                })
            })
        }
        this.getMyCourses();
        this.getAllCourses();
        this.setState({user: this.getCookieValue("user")});
    }

    // https://reactjs.org/docs/conditional-rendering.html
    LoggedInAs() {
        return this.getCookieValue("user");
    }

    handleLogout() {
        // https://reactrouter.com/docs/en/v6/api#navigate
        document.cookie = "user="
        document.cookie = "role="
        // navigate('/');
        this.setState({
            currentPath: ""
        }, () => {
            document.getElementById("navigation").click();
            this.setState({
                currentPath: "studentdashboard"
            })
        });
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

    parseTime(timeString) {
        let hhmm = timeString.split(":");
        return parseInt(hhmm[0]) * 60 + parseInt(hhmm[1]);
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

        // ADD EVERTHING TO SCHEDULE
        // add each course to myCourses
        console.log("MY COURSES ARE");
        console.log(result);

        let tempMyCourseTimes = this.state.myCourseTimes;
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
            // calculate the time
            let timeIndex = (result[i].startTime - 480) / 30;

            // add to schedule based on day of the week
            if (result[i].sessions == "Mon-Wed") {
                tempMyCourseTimes[timeIndex][0].push({name: result[i].name});
                tempMyCourseTimes[timeIndex][2].push({name: result[i].name});

                // courses last 80 minutes so extend the course to the next 2 time slots
                tempMyCourseTimes[timeIndex + 1][0].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 1][2].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 2][0].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 2][2].push({name: result[i].name});

            } else if (result[i].sessions == "Tue-Thu") {
                tempMyCourseTimes[timeIndex][1].push({name: result[i].name});
                tempMyCourseTimes[timeIndex][3].push({name: result[i].name});

                // courses last 80 minutes so extend the course to the next 2 time slots
                tempMyCourseTimes[timeIndex + 1][1].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 1][3].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 2][1].push({name: result[i].name});
                tempMyCourseTimes[timeIndex + 2][3].push({name: result[i].name});
            }
        }

        // replace state
        this.setState({
            myCourseTimes: tempMyCourseTimes
        }, () => {
            console.log("MY COURSE STATE IS ");
            console.log(this.state.myCourseTimes);
        });

        // ADD EVERYTHING TO WORKSHEET
        // replace state
        let tempMyCourses = this.state.myCourses;
        for (let i = 0; i < result.length; i++) {
            tempMyCourses.push({code: result[i].code, number: result[i].number, name: result[i].name, prof: result[i].prof, sessions: result[i].sessions, startTime: result[i].startTime, endTime: result[i].endTime})
        }
        this.setState({
            myCourses: tempMyCourses
        }, () => {});
    }

    async removeCourse(e) {
        let courseName = e.target.parentElement.parentElement.children.item(2).innerHTML;
        console.log("TRYING TO REMOVE COURSE: " + courseName);

        // remove from database
        const result = await fetch('http://localhost:5000/api/studentCourse/deleteStudentCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: courseName
            })
        }).then((res) => res.json());
        
        console.log(result);

        // remove from schedule
        let tempMyCourseTimes = this.state.myCourseTimes;
        let startTime = this.parseTime(e.target.parentElement.parentElement.children.item(5).innerHTML);
        let sessions = e.target.parentElement.parentElement.children.item(4).innerHTML;

        let timeIndex = (startTime - 480) / 30;
        console.log("sessions", sessions);
        if (sessions == "Mon/Wed") {
            let array1 = tempMyCourseTimes[timeIndex][0];
            var removeIndex = array1.map(item => item.name).indexOf(courseName);
            array1.splice(removeIndex, 1);

            let array2 = tempMyCourseTimes[timeIndex + 1][0];
            var removeIndex = array2.map(item => item.name).indexOf(courseName);
            array2.splice(removeIndex, 1);

            let array3 = tempMyCourseTimes[timeIndex + 2][0];
            var removeIndex = array3.map(item => item.name).indexOf(courseName);
            array3.splice(removeIndex, 1);

            let array4 = tempMyCourseTimes[timeIndex][2];
            var removeIndex = array4.map(item => item.name).indexOf(courseName);
            array4.splice(removeIndex, 1);

            let array5 = tempMyCourseTimes[timeIndex + 1][2];
            var removeIndex = array5.map(item => item.name).indexOf(courseName);
            array5.splice(removeIndex, 1);

            let array6 = tempMyCourseTimes[timeIndex + 2][2];
            var removeIndex = array6.map(item => item.name).indexOf(courseName);
            array6.splice(removeIndex, 1);
        } else if (sessions == "Tue/Thu") {
            let array1 = tempMyCourseTimes[timeIndex][1];
            var removeIndex = array1.map(item => item.name).indexOf(courseName);
            array1.splice(removeIndex, 1);

            let array2 = tempMyCourseTimes[timeIndex + 1][1];
            var removeIndex = array2.map(item => item.name).indexOf(courseName);
            array2.splice(removeIndex, 1);

            let array3 = tempMyCourseTimes[timeIndex + 2][1];
            var removeIndex = array3.map(item => item.name).indexOf(courseName);
            array3.splice(removeIndex, 1);

            let array4 = tempMyCourseTimes[timeIndex][3];
            var removeIndex = array4.map(item => item.name).indexOf(courseName);
            array4.splice(removeIndex, 1);

            let array5 = tempMyCourseTimes[timeIndex + 1][3];
            var removeIndex = array5.map(item => item.name).indexOf(courseName);
            array5.splice(removeIndex, 1);

            let array6 = tempMyCourseTimes[timeIndex + 2][3];
            var removeIndex = array6.map(item => item.name).indexOf(courseName);
            array6.splice(removeIndex, 1);
        }
        
        this.setState({
            myCourseTimes: tempMyCourseTimes
        }, () => {
            console.log("MY COURSE STATE IS ");
            console.log(this.state.myCourseTimes);
        });

        // remove from worksheet
        e.target.parentElement.parentElement.remove();
    }

    displayTime(minute) {
        let hh = parseInt(minute/60).toString().padStart(2, '0');
        let mm = (minute%60).toString().padStart(2, '0');
        return hh + ":" + mm;
    }

    async getAllCourses() {
        // fetch courses
        const result = await fetch('http://localhost:5000/api/course/getCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({})
        }).then((res) => res.json());

        // update state
        this.setState({
            allCourses: result
        }, () => console.log(this.state.allCourses));
    }

    courseInfo() {
        // https://stackoverflow.com/questions/14976495/get-selected-option-text-with-javascript
        let sel = document.getElementById("selectedCourse");
        let selected = sel.options[sel.selectedIndex].text;
        let attr = selected.split('\u00A0');
        let courses = this.state.allCourses;

        for (var i = 0; i < courses.length; ++i) {
            if (courses[i].code == attr[0] && courses[i].number == attr[1]
            && courses[i].sessions == attr[2].replace("/", "-")
            && this.displayTime(courses[i].startTime) == attr[3]) {
                alert(`${attr[0]}${attr[1]}: ${courses[i].name}\n`
                + `Professor: ${courses[i].prof}\n`
                + `Sessions: ${attr[2]} ${attr[3]}-${this.displayTime(courses[i].endTime)}`);
                return;
            }
        }

        alert("No course selected or course not found.");
    }

    async addThisCourse() {
        let myName = this.getCookieValue("user");
        let courseName = document.getElementById("selectedCourse").value;

        // first get the course's information from the database
        const retrievedCourse = await fetch('http://localhost:5000/api/course/getCourseByName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: courseName
            })
        }).then((res) => res.json());
        console.log("ADDING COURSE: THIS IS RETRIEVED COURSE:");
        console.log(retrievedCourse);

        // then add it as a student course to the database
        const result = await fetch('http://localhost:5000/api/studentCourse/addStudentCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                stud: myName,
                code: retrievedCourse[0].code,
                number: retrievedCourse[0].number,
                sessions: retrievedCourse[0].sessions,
                startTime: retrievedCourse[0].startTime
            })
        }).then((res) => res.json());

        console.log("RESULT OF ADDING THE COURSE");
        console.log(result);
        document.getElementById("selectedCourse").value = "";

        if (!result.success) {
            alert(result.info);
            return;
        }

        // UPDATE STATE OF SCHEDULE BOARD
        let tempMyCourseTimes = this.state.myCourseTimes;
        let timeIndex = (retrievedCourse[0].startTime - 480) / 30;

        // add to schedule based on day of the week
        if (retrievedCourse[0].sessions == "Mon-Wed") {
            tempMyCourseTimes[timeIndex][0].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex][2].push({name: retrievedCourse[0].name});

            // courses last 80 minutes so extend the course to the next 2 time slots
            tempMyCourseTimes[timeIndex + 1][0].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex + 1][2].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex + 2][0].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex + 2][2].push({name: retrievedCourse[0].name});

        } else if (retrievedCourse[0].sessions == "Tue-Thu") {
            tempMyCourseTimes[timeIndex][1].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex][3].push({name: retrievedCourse[0].name});

            // courses last 80 minutes so extend the course to the next 2 time slots
            tempMyCourseTimes[timeIndex + 1][1].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex + 1][3].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex + 2][1].push({name: retrievedCourse[0].name});
            tempMyCourseTimes[timeIndex + 2][3].push({name: retrievedCourse[0].name});
        }

        // replace state
        this.setState({
            myCourseTimes: tempMyCourseTimes
        }, () => {
            console.log("MY COURSE STATE IS ");
            console.log(this.state.myCourseTimes);
        });

        // add to worksheet
        let tempMyCourses = this.state.myCourses;
        tempMyCourses.push({code: retrievedCourse[0].code, number: retrievedCourse[0].number, name: retrievedCourse[0].name, prof: retrievedCourse[0].prof, sessions: retrievedCourse[0].sessions, startTime: retrievedCourse[0].startTime, endTime: retrievedCourse[0].endTime})
        this.setState({
            myCourses: tempMyCourses
        }, () => {});
    }

    render() {
        // this populates the schedule according to the myCourseTimes state variable
        var myScheduleTimes = this.state.allPossibleTimes.map((item, i) => (
            <tr key={i} id={i}>
                <td>{this.displayTime(item)}</td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][0].length > 1 ? 'yellow' : 'aquamarine'}}>
                    {this.state.myCourseTimes[i][0].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][1].length > 1 ? 'yellow' : 'aquamarine'}}>
                    {this.state.myCourseTimes[i][1].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][2].length > 1 ? 'yellow' : 'aquamarine'}}>
                    {this.state.myCourseTimes[i][2].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
                <td style={{backgroundColor: this.state.myCourseTimes[i][3].length > 1 ? 'yellow' : 'aquamarine'}}>
                    {this.state.myCourseTimes[i][3].map((course, j) => (
                        <div key={j}>{course.name}</div>
                    ))}
                </td>
            </tr>
        ));

        // these classes will populate the worksheet area
        var classes = this.state.myCourses.map((item, i) => (
            <tr key={i}>
                <td>{item.code}</td>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.prof}</td>
                <td>{item.sessions.replace("-", "/")}</td>
                <td>{this.displayTime(item.startTime)}</td>
                <td>{this.displayTime(item.endTime)}</td>
                <td><button onClick={this.removeCourse}>Remove Course</button></td>
            </tr>
        ));

        // These are the courses displayed in the search dropdown
        var displayCourses = this.state.allCourses.map((item, i) => (
            <option key={i} value={item.name}>
                {item.code}&nbsp;{item.number}&nbsp;
                {item.sessions.replace("-", "/")}&nbsp;{this.displayTime(item.startTime)}
            </option>
        ));

        return (
            <>
                <h2>Student Dashboard</h2>
                <p>Logged in as: <b>{this.state.user}</b> <button onClick={this.handleLogout}>Logout</button></p>

                {/* COURSE SELECTION AREA BEGIN */}
                <div>
                    Select a Course:&nbsp;
                    <select id="selectedCourse" name="selectedCourse">
                        <option value="None"></option>
                        {displayCourses}
                    </select>
                    &nbsp;
                    <button onClick={this.courseInfo}>Display Course Info</button>
                    <button onClick={this.addThisCourse}>Add This Course</button>
                </div>
                {/* COURSE SELECTION AREA END */}

                {/* WORKSHEET BEGIN */}
                <div>
                    <h3>My Courses</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Department Code</th>
                                <th>Course Number</th>
                                <th>Name</th>
                                <th>Professor</th>
                                <th>Course Days</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody id="mycourses">{classes}</tbody>
                    </table>
                </div>
                {/* WORKSHEET END */}

                {/* Schedule BEGIN */}
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myScheduleTimes}
                    </tbody>
                </table>
                {/* Schedule END */}

                <Navigate path={this.state.currentPath}/>
            </>
        );
    }
}

export default StudentDashboard;
