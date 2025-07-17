import "./page_styles/contactpage.css";

import Navbar from "../assets/Navbar";

function Contactpage() {
    return (
        <>
            <Navbar></Navbar>
            <div className="contact-info-container">
                <p>
                    Feel free to reach out on my <a href="">LinkedIn!</a>
                </p>
            </div>
        </>
    );
}

export default Contactpage;
