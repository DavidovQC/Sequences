import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Aboutpage from "../pages/Aboutpage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage></Homepage>}></Route>
                <Route path="/About" element={<Aboutpage></Aboutpage>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
