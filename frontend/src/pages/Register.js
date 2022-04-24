import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function Register(props) {
    const navigate = useNavigate();

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    console.log(document.cookie);

    //https://javascript.info/cookie
    function getCookieValue(name){
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));

        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    useEffect(() => {
        let role = getCookieValue("role");
        if (document.cookie != "") {
            if (role == "prof") { navigate("/professordashboard") }
            else if (role == "stud") { navigate("/studentdashboard") }
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

            if (result.success) { navigate("/"); }
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
        <p>Username: <input id="uname"></input></p>
        <p>Password: <input type="password" id="pword"></input></p>

        {/* https://reactjs.org/docs/faq-functions.html */}
        <button onClick={handleRegister.bind(this, false)}>Register as Student</button>
        <button onClick={handleRegister.bind(this, true)}>Register as Professor</button>
        <button onClick={goToLogin}>Go to Login Page</button>
        </>
    );
}

export default Register;
