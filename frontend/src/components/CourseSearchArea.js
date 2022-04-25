import React, { Component } from 'react';

class CourseSearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = { allCourses: [] };
        this.getCookieValue = this.getCookieValue.bind(this);
        this.getAllCourses = this.getAllCourses.bind(this);
        this.addThisCourse = this.addThisCourse.bind(this);

        this.courseInfo = this.courseInfo.bind(this);
    }

    componentDidMount() {
        this.getAllCourses();
    }

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

        alert("Course not found or no course selected.");
    }

    async addThisCourse(){
        let myName = this.getCookieValue("user");
        let courseName = document.getElementById("selectedCourse").value;
        //first get the course's information from the database
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

        //then add it as a student course to the database
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
            //stud, code, number, sessions, startTime
        }).then((res) => res.json());

        console.log("RESULT OF ADDING THE COURSE");
        console.log(result);
    }

    render() {
        var displayCourses = this.state.allCourses.map((item, i) => (
            <option key={i} value={item.name}>
                {item.code}&nbsp;{item.number}&nbsp;
                {item.sessions.replace("-", "/")}&nbsp;{this.displayTime(item.startTime)}
            </option>
        ))
        return (
            <div>
                Select Courses:&nbsp;
                <select id="selectedCourse" name="selectedCourse">
                    <option value="None"></option>
                    {displayCourses}
                </select>
                &nbsp;
                <button onClick={this.courseInfo}>Display Course Info</button>
                <button onClick={this.addThisCourse}>Add This Course</button>
            </div>   
        );
    }
}

export default CourseSearchArea;
