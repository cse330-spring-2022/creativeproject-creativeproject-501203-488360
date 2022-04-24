import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function Login(props) {
    const navigate = useNavigate();
    console.log(document.cookie);

    // https://javascript.info/cookie
    function getCookieValue(name) {
        let match = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return match = match ? decodeURIComponent(match[1]) : undefined;
    }

    // https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        let role = getCookieValue("role");
        if (role != "") {
            if (role == "prof") { navigate("/professordashboard") }
            else if (role == "stud") { navigate("/studentdashboard") }
        }
    });

    async function handleRegister() {
        let loginName = document.getElementById("uname").value;
        let password = document.getElementById("pword").value;

        if (loginName && !(/\s/g.test(loginName)) && password) {
            const result = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    loginName,
                    password
                })
            }).then((res) => res.json());

            if (result.success == true) {
                if (result.object.isProf) {
                    document.cookie = "user=" + loginName;
                    document.cookie = "role=prof";
                    navigate("/professordashboard");
                } else {
                    document.cookie = "user=" + loginName;
                    document.cookie = "role=stud";
                    navigate("/studentdashboard");
                }
            } else {
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

    function goToRegister() {
        navigate("/register");
    }

    return (
        <>
        <h1>Login</h1>
        <p>Username: <input id="uname"></input></p>
        <p>Password: <input type="password" id="pword"></input></p>
        <button onClick={handleRegister}>Login</button>
        <button onClick={goToRegister}>Go to register page</button>
        </>
    );
}

export default Login;
