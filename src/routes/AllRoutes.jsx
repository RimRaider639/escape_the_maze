import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Room from '../pages/Room';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:room" element={<Room />} />
    </Routes>
  );
};

export default AllRoutes;
