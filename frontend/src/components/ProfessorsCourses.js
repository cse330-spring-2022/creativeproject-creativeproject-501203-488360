import React, { Component } from 'react';
import { Navigate } from "react-router-dom";

class ProfessorsCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { myCourses: [] };
        this.getMyCourses = this.getMyCourses.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
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
        let professor = this.getCookieValue("user");
        const result = await fetch('http://localhost:5000/api/course/getCourseByProf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ professor })
        }).then((res) => res.json());

        // update the state to reflect the professor's courses
        this.setState({ myCourses: result });
    }

    async deleteCourse(e) {
        let role = this.getCookieValue("role");
        if (role == "") {
            // https://reactrouter.com/docs/en/v6/api#navigate
            <Navigate to="/" replace={true} />

            return;
        }

        // delete the course from the database
        let name = e.target.parentElement.parentElement.firstChild.innerHTML;
        console.log(name);
        const result = await fetch('http://localhost:5000/api/course/deleteCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        }).then((res) => res.json());

        console.log(result);

        // delete the course from the DOM
        let row = e.target.parentElement.parentElement;
        row.remove();
    }

    render() {
        var myCourses = this.state.myCourses.map((item, i) => (
            <tr key={i}>
                <td>{item.code}</td>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.sessions}</td>
                <td>{this.displayTime(item.startTime)}</td>
                <td>{this.displayTime(item.endTime)}</td>
                <td><button onClick={this.deleteCourse}>Delete</button></td>
            </tr>
        ));
        return (
            <div>
                <div>My Courses</div>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Days</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="myCourses">{myCourses}</tbody>
                </table>
            </div>
        );
    }
}

export default ProfessorsCourses;
