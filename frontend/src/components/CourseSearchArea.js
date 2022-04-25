import React, { Component } from 'react';

class CourseSearchArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCourses: []
        }
        this.getCookieValue = this.getCookieValue.bind(this);
        this.getAllCourses = this.getAllCourses.bind(this);
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

    render() {
        var displayCourses = this.state.allCourses.map((item, i) => (
            <option key={i} value={item.name}>{item.name}</option>
        ))
        return (
            <div>
                All Courses
                <select id="courseStartTime" name="startTime">
                    <option value="None"></option>
                    {displayCourses}
                </select> 
                <button>Add This Course</button>
            </div>   
        );
    }
}

export default CourseSearchArea;
