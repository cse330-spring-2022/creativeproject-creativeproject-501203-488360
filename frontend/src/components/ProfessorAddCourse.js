
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function ProfessorAddCourse(props) {
    const navigate = useNavigate();
    const allPossibleStartTimes = [480, 510, 540, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170];
    console.log(document.cookie);

    // https://javascript.info/cookie
    function getCookieValue(name) {
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    function displayTime(minute) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
        let hh = parseInt(minute/60).toString().padStart(2, '0');
        let mm = (minute%60).toString().padStart(2, '0');

        return hh + ":" + mm;
    }

    async function addCourse() {
        let prof = getCookieValue("user");
        let name = document.getElementById("courseName").value;
        let code = document.getElementById("courseCode").value;
        let number = document.getElementById("courseNumber").value;
        let sessions = document.getElementById("courseSessions").value;
        let startTime = parseInt(document.getElementById("courseStartTime").value);

        if (prof && name && name.trim() && code && code.trim() && number && number.trim()
        && sessions && startTime) {
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

            if (result.success) {
                let newCourse = document.createElement("div");
                newCourse.innerHTML = name;
                document.getElementById('myCourses').appendChild(newCourse);
                
                document.getElementById("courseName").value = "";
                document.getElementById("courseCode").value = "";
                document.getElementById("courseNumber").value = "";
                document.getElementById("courseSessions").value = "";
                document.getElementById("courseStartTime").value = "";
            } else { alert(result.info); }
        } else {
            alert("At least one of the required fields are empty. Please retry");
        }
    }

    var timeOptions = allPossibleStartTimes.map((item, i) =>(
        <option value={item} key={i}>{displayTime(allPossibleStartTimes[i])}</option>
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
                <label htmlFor="sessions">Course Sessions (Days): </label>
                <select id="courseSessions" name="courseSessions">
                    <option value="None"></option>
                    <option value="Mon-Wed">Monday &amp; Wednesday</option>
                    <option value="Tue-Thu">Tuesday &amp; Thurday</option>
                </select>
            </div>
            <div>
            <label htmlFor="startTime">Course Sessions (Starting Time): </label>
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
