import "./page_styles/contactpage.css";

import MyNav from "../assets/MyNav";

function Contactpage() {
    return (
        <>
            <MyNav></MyNav>
            <div className="contact-info-container">
                <p>
                    Feel free to reach out on my <a href="">LinkedIn!</a>
                </p>
            </div>
        </>
    );
}

export default Contactpage;
