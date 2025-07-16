import "./asset_styles/searchbar-styles.css";
import { FaSearch } from "react-icons/fa";

function Searchbar({ value, onChange, onFocus, onBlur }) {
    return (
        <div className="input-container">
            <FaSearch id="search-icon"></FaSearch>
            <input
                placeholder="Type to search"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            ></input>
        </div>
    );
}

export default Searchbar;
