
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function Login(props) {
    const navigate = useNavigate();

    console.log(document.cookie);

    // https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        if (document.cookie != "") {
            let cookies = document.cookie.split(" ");
            if (cookies[1] == "prof") { navigate("/professordashboard") }
            else if (cookies[1] == "stud") { navigate("/studentdashboard") }
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
                    document.cookie = result.object.loginName + " prof"; 
                    navigate("/professordashboard");
                } else {
                    document.cookie = result.object.loginName + " stud"; 
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
        <input id="uname"></input>
        <input id="pword"></input>
        <button onClick={handleRegister}>Login</button>
        <button onClick={goToRegister}>Go to register page</button>
        </>
    );
}

export default Login;
