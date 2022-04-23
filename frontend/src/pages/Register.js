
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function Register(props) {
    const navigate = useNavigate();

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    console.log(document.cookie);

    useEffect(() => {
        if (document.cookie != "") {
            let cookies = document.cookie.split(" ");
            if (cookies[1] == "prof") { navigate("/professordashboard") }
            else if (cookies[1] == "stud") { navigate("/studentdashboard") }
        }
    });

    async function handleRegister(prof) {
        let loginName = document.getElementById("uname").value;
        let password = document.getElementById("pword").value;

        // username can't be empty or contain whitespace; password can't be empty
        // https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
        if (loginName && !(/\s/g.test(loginName)) && password) {
            const result = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    loginName,
                    password,
                    isProf: prof
                })
            }).then((res) => res.json());

            if (result.success) { navigate("/login"); }
            else {
                alert(result.info);
                document.getElementById("uname").value = "";
                document.getElementById("pword").value = "";
            }
        } else {
            alert("Username and can't be empty or contain or contain whitespace.\n"
            + "Password can't be empty.");
            document.getElementById("uname").value = "";
            document.getElementById("pword").value = "";
        }
    }

    function goToLogin() {
        navigate("/");
    }

    return (
        <>
        <h1>Register</h1>
        <input id="uname"></input>
        <input id="pword"></input>

        {/* https://reactjs.org/docs/faq-functions.html */}
        <button onClick={handleRegister.bind(this, false)}>Register as Student</button>
        <button onClick={handleRegister.bind(this, true)}>Register as Professor</button>
        <button onClick={goToLogin}>Go to Login Page</button>
        </>
    );
}

export default Register;
