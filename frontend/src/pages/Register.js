
import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function Register(props) {
    const navigate = useNavigate();

    async function handleRegister(){
        let loginName = document.getElementById("uname").value;
        let password = document.getElementById("pword").value;

        const result = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
                loginName,
                password,
                isProf: true
            })
          }).then((res) => res.json());
        if (result.success == true){
            navigate("/login");
        }else{
            alert(result.info);
        }
    }

    function goToLogin(){
        navigate("/login");
    }

    return (
        <>
        <h1>Register</h1>
            <input id="uname">
            </input>
            <input id="pword">
            </input>

            <button onClick={handleRegister}>Register</button>
            <button onClick={goToLogin}>Go to login page</button>
        </>
    );
}



// Register.propTypes = {

// };

export default Register;