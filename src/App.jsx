import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Aboutpage from "../pages/Aboutpage";
import Contactpage from "../pages/Contactpage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage></Homepage>}></Route>
                <Route path="/About" element={<Aboutpage></Aboutpage>}></Route>
                <Route
                    path="/Contact"
                    element={<Contactpage></Contactpage>}
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;
