// import React, { Component } from 'react';
// import { useNavigate } from "react-router-dom";

// class Register extends Component {
//     constructor(props){
//         super(props);
//         this.register = this.register.bind(this);
//     }
//     register(){
//         const navigate = useNavigate();
//         navigate("/studentdashboard");
//     }
//     render() {
//         return (
//             <>
//                 <div>
//                     Register
//                 </div>
//                 <button>
//                     Register
//                 </button>
//             </>
//         );
//     }
// }


// export default Register;


import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function App(props) {
    const navigate = useNavigate();
    function Register(){
        navigate("/studentdashboard");
    }

    return (
        <>
            <div>
                Register
            </div>
            <button onClick={Register}>
                Register
            </button>
        </>
    );
}



// Register.propTypes = {

// };

export default App;