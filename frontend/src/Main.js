import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/register' element={<Register />}></Route>
      <Route exact path='/' element={<Login />}></Route>
      <Route exact path='/studentdashboard' element={<StudentDashboard />}></Route>
      <Route exact path='/professordashboard' element={<ProfessorDashboard />}></Route>
    </Routes>
  );
}

export default Main;
