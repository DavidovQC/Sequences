import "./asset_styles/search-results-list-styles.css";
import SearchResult from "./SearchResult";

function SearchResultsList({ results, performOnClick }) {
    return (
        <div className="results-container">
            <div className="results-list">
                {results.map((result, id) => {
                    return (
                        <SearchResult
                            key={id}
                            result={result}
                            performOnClick={performOnClick}
                        ></SearchResult>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchResultsList;
