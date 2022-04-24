import React, { Component } from 'react';

class ProfessorsCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            myCourses: []
        }
        this.getMyCourses = this.getMyCourses.bind(this);
    }

    componentDidMount(){
        this.getMyCourses();
    }

    //https://javascript.info/cookie
    getCookieValue(name){
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    async getMyCourses(){
        let professor = this.getCookieValue("user");
        const result = await fetch('http://localhost:5000/api/course/getCourseByProf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                professor
            })
          }).then((res) => res.json());
          //update the state to reflect the professor's courses
          this.setState({myCourses: result});
    }
    render() {
        var myCourses = this.state.myCourses.map((item, i) => (
            <div key={i}>{item.name}</div>
        ))
        return (
            <div>
                <div>
                    My Courses
                </div>
                <div id="myCourses">
                    {myCourses}
                </div>
            </div>
        );
    }
}

export default ProfessorsCourses;