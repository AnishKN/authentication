import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import React from "react";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          
          <Route path="*" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
