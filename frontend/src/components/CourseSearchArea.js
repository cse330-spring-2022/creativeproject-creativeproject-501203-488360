import React, { Component } from 'react';

class CourseSearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = { allCourses: [] };
        this.getCookieValue = this.getCookieValue.bind(this);
        this.getAllCourses = this.getAllCourses.bind(this);
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
        let sel = document.getElementById("courseStartTime");
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
                <select id="courseStartTime" name="startTime">
                    <option value="None"></option>
                    {displayCourses}
                </select>
                &nbsp;
                <button onClick={this.courseInfo}>Display Course Info</button>
                <button>Add This Course</button>
            </div>   
        );
    }
}

export default CourseSearchArea;
