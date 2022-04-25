import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Register() {
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

    // if logged in in another tab, then log in directly in this tab as well
    useEffect(() => {
        let role = getCookieValue("role");
        if (document.cookie != "") {
            if (role == "prof") { navigate("/professordashboard"); }
            else if (role == "stud") { navigate("/studentdashboard"); }
        }
    });

    async function handleRegister(prof) {
        let loginName = document.getElementById("uname").value;
        let password = document.getElementById("pword").value;

        // Username and password can't be empty and should be pure alphanumeric
        // https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
        if (loginName && /^[\p{sc=Latn}0-9]+$/u.test(loginName)
        && password && /^[A-Za-z0-9]+$/.test(password)) {
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
            alert("Username and password can't be empty and should be pure alphanumeric.");
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
