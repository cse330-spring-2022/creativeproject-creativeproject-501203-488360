import React, { Component } from 'react';

class ProfessorsCourses extends Component {
    constructor(props){
        super(props);
        this.state = {
            myCourses: []
        }
        this.getMyCourses = this.getMyCourses.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

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

    async deleteCourse(e){
        //delete the course from the database
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

        //delete the course from the DOM
          let row = e.target.parentElement.parentElement
          row.remove();

    }

    render() {
        var myCourses = this.state.myCourses.map((item, i) => (
            // <div key={i}>{item.name}</div>
            <tr key={i}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.number}</td>
                <td>{item.sessions}</td>
                <td>{item.startTime}</td>
                <td><button onClick={this.deleteCourse}>Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <div>
                    My Courses
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Number</th>
                            <th>Sessions</th>
                            <th>Start Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="myCourses">
                        {myCourses}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProfessorsCourses;