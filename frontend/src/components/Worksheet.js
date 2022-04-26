import React, { Component } from 'react';

class Worksheet extends Component {
    constructor(props){
        super(props);
        this.state = {
            myCourses: [], // an array of objects with course info
            myCourseTimes: [] // an array of arrays corresponding to the time in each course
        }
        this.getMyCourses = this.getMyCourses.bind(this);
        this.getCookieValue = this.getCookieValue.bind(this);
        this.removeCourse = this.removeCourse.bind(this);

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

    // fetch the courses the user has already added to their sheet 
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

        // replace state
        let tempMyCourses = this.state.myCourses;
        for (let i = 0; i < result.length; i++){
            tempMyCourses.push({code: result[i].code, number: result[i].number, name: result[i].name, prof: result[i].prof, sessions: result[i].sessions, startTime: result[i].startTime, endTime: result[i].endTime})
        }
        this.setState({
            myCourses: tempMyCourses
        }, () => {})
    }

    async removeCourse(e){
        let courseName = e.target.parentElement.parentElement.children.item(2).innerHTML;
        console.log("TRYING TO REMOVE COURSE: " + courseName);
        //remove from database
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

        //remove from schedule

        //remove from worksheet
    }

    render() {
        var classes = this.state.myCourses.map((item, i) => (
            <tr key={i}>
                <td>{item.code}</td>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.prof}</td>
                <td>{item.sessions}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td><button onClick={this.removeCourse} >Remove Course</button></td>
            </tr>
        ));

        return (
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="mycourses">{classes}</tbody>
                </table>
            </div>
        );
    }
}

export default Worksheet;
