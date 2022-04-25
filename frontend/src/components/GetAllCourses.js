import React, { Component } from 'react';

class GetAllCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { courses: [] };
        this.getCourses = this.getCourses.bind(this);
    }

    componentDidMount() {
        this.getCourses();
    }

    displayTime(minute) {
        let hh = parseInt(minute/60).toString().padStart(2, '0');
        let mm = (minute%60).toString().padStart(2, '0');
        return hh + ":" + mm;
    }

    async getCourses() {
        const result = await fetch('http://localhost:5000/api/course/getCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => res.json());
        this.setState({ courses: result });
    }

    render() {
        var allCourses = this.state.courses.map((item, i) => (
            <tr key={i}>
                <td>{item.code}</td>
                <td>{item.number}</td>
                <td>{item.name}</td>
                <td>{item.prof}</td>
                <td>{item.sessions}</td>
                <td>{this.displayTime(item.startTime)}</td>
                <td>{this.displayTime(item.endTime)}</td>
            </tr>
        ));
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Professor</th>
                            <th>Days</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody id="courses">{allCourses}</tbody>
                </table>
            </div>
        );
    }
}

export default GetAllCourses;
