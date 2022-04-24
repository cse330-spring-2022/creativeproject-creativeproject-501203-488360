
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function ProfessorAddCourse(props) {
    const navigate = useNavigate();
    const allPossibleStartTimes = [480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170];
    const allPossibleDisplayStartTimes = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM"];


    console.log(document.cookie);

    //https://javascript.info/cookie
    function getCookieValue(name){
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    async function addCourse(){
        let prof = getCookieValue("user");
        let name = document.getElementById("courseName").value;
        let code = document.getElementById("courseCode").value;
        let number = document.getElementById("courseNumber").value;
        let sessions = document.getElementById("courseSessions").value;
        let startTime = parseInt(document.getElementById("courseStartTime").value);

        const result = await fetch('http://localhost:5000/api/course/addCourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                prof,
                name,
                code,
                number,
                sessions,
                startTime
            })
        }).then((res) => res.json());

        let newCourse = document.createElement("div");
        newCourse.innerHTML = name;
        document.getElementById('myCourses').appendChild(newCourse);
    }

    var timeOptions = allPossibleStartTimes.map((item, i) =>(
        <option value={item} key={i}>{allPossibleDisplayStartTimes[i]}</option>
    ))

    return (
        <div>
            <h3>Create A Course</h3>
            <div>
                <label htmlFor="courseName">Course Name: </label><input id="courseName" name="courseName"></input>
            </div>
            <div>
                <label htmlFor="courseCode">Course Code: </label><input id="courseCode" name="courseCode"></input>
            </div>
            <div>
                <label htmlFor="courseNumber">Course Number: </label><input id="courseNumber" name="courseNumber"></input>
            </div>
            <div>
                <label htmlFor="sessions">Course Sessions:</label>
                <select id="courseSessions" name="courseSessions">
                    <option value="None"></option>
                    <option value="Mon-Wed">Monday-Wednesday</option>
                    <option value="Tue-Thu">Tuesday-Thurday</option>
                </select>
            </div>
            <div>
            <label htmlFor="startTime">Course Sessions:</label>
                <select id="courseStartTime" name="startTime">
                    <option value="None"></option>
                    {timeOptions}
                </select>            
            </div>
            <button onClick={addCourse}>Add</button>
        </div>
    );
}

export default ProfessorAddCourse;
