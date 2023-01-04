import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard";

import Login from "../Login/Login";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard />}>
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
