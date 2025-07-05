import "./asset_styles/navbar-styles.css";

function Navbar() {
    return (
        <nav className="nav">
            <div className="title-wrap">
                <a href="/" className="site-title">
                    Online Analytica of Integer Sequences
                </a>
            </div>
            <div className="options-wrap">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>

                    <li>
                        <a href="/About">About</a>
                    </li>

                    <li>
                        <a href="/Results">Results</a>
                    </li>

                    <li>
                        <a href="/Contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
