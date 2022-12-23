import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardAdmin from "../DashboardAdmin";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardAdmin />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<DashboardAdmin />}>
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
