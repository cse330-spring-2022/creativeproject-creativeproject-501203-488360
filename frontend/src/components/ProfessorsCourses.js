import React, { Component } from 'react';

class ProfessorsCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            myCourses: []
        }
        this.getMyCourses = this.getMyCourses.bind(this);
    }

    async getMyCourses(){
        let prof = "testName";
        const result = await fetch('http://localhost:5000/api/course/getCourseByProf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                prof
            })
          }).then((res) => res.json());
          //update the state to reflect the professor's courses
          this.setState({myCourses: result});
    }
    render() {
        var myCourses = this.state.myCourses.map((item, i) => (
            <div>{item}</div>
        ))
        return (
            <div>
                {myCourses}
            </div>
        );
    }
}

export default ProfessorsCourses;