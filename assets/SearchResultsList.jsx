import "./asset_styles/search-results-list-styles.css";
import SearchResult from "./SearchResult";

function SearchResultsList({ results }) {
    return (
        <div className="results-container">
            <div className="results-list">
                <div>A</div>
                <div>B</div>
                <div>C</div>

                <div>A</div>
                <div>B</div>
                <div>C</div>

                <div>A</div>
                <div>B</div>
                <div>C</div>

                <div>A</div>
                <div>B</div>
                <div>C</div>

                <div>A</div>
                <div>B</div>
                <div>C</div>

                <div>A</div>
                <div>B</div>
                <div>C</div>

                <div>A</div>
                <div>B</div>
                <div>C</div>

                <div>A</div>
                <div>B</div>
                <div>C</div>
                {/* {results.map((result, id) => {
                    <SearchResult result={result} key={id}></SearchResult>;
                })} */}
            </div>
        </div>
    );
}

export default SearchResultsList;
