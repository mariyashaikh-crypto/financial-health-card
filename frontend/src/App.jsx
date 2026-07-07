import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Assessment from "./pages/Assessment";
import Loading from "./pages/Loading";
import Report from "./pages/Report";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />

        <Route path="/assessment" element={<Assessment />} />

        <Route path="/loading" element={<Loading />} />

        <Route path="/report" element={<Report />} />

      </Routes>

    </BrowserRouter>

  );

}