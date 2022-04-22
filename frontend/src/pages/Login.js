
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function Login(props) {
    const navigate = useNavigate();

    async function handleRegister(){
        let loginName = document.getElementById("uname").value;
        let password = document.getElementById("pword").value;

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

        if (result.success == true){
            if (result.object.isProf){
                navigate("/professordashboard");
            }else{
                navigate("/studentdashboard");
            }
        }else{
            alert(result.info);
        }
    }

    function goToRegister(){
        navigate("/");
    }

    return (
        <>
        <h1>Login</h1>
            <input id="uname">
            </input>
            <input id="pword">
            </input>

            <button onClick={handleRegister}>Login</button>
            <button onClick={goToRegister}>Go to register page</button>
        </>
    );
}



// Register.propTypes = {

// };

export default Login;