import React, { Component } from 'react';

class CourseSearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCourses: []
        }
        this.getCookieValue = this.getCookieValue.bind(this);
        this.getAllCourses = this.getAllCourses.bind(this);
        this.addThisCourse = this.addThisCourse.bind(this);

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

    async getAllCourses() {
        //fetch courses
        const result = await fetch('http://localhost:5000/api/course/getCourse', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({})
        }).then((res) => res.json());
        //update state
        this.setState({
            allCourses: result
        }, () => console.log(this.state.allCourses))

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
            <option key={i} value={item.name}>{item.name}</option>
        ))
        return (
            <div>
                All Courses
                <select id="selectedCourse" name="selectedCourse">
                    <option value="None"></option>
                    {displayCourses}
                </select> 
                <button onClick={this.addThisCourse}>Add This Course</button>
            </div>   
        );
    }
}

export default CourseSearchArea;
