import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Register />}></Route>
      <Route exact path='/login' component={<Login />}></Route>
    </Routes>
  );
}

export default Main;