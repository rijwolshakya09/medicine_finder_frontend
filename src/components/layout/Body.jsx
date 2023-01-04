import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../Dashboard/Home";

import Login from "../Login/Login";
import Register from "../Register/Register";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          {/* <Route path="" element={<DashboardHome />} />
          <Route path="admin_approve" element={<AdminApprove />} />
          <Route path="audio_book" element={<AudioBookUpload />} />
          <Route path="ebook" element={<EBookUpload />} />
          <Route path="request" element={<EBookRentRequest />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default Body;
