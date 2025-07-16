import "./asset_styles/search-result-styles.css";

function SearchResult({ result, performOnClick }) {
    const title = result.title[0];
    const displayTitle = title.length > 58 ? title.slice(0, 59) + "..." : title;
    const digitStrings = result.data[0];
    const nums = digitStrings.split(",").map((num) => num.trim());

    const digitLimit = 8;

    const displayDigits =
        nums.length > digitLimit
            ? nums.slice(0, digitLimit).join(", ") + "..."
            : nums.join(", ");

    const displaySeq = "A" + result.seqID[0];

    return (
        <div
            className="search-result-container"
            onClick={() => performOnClick(result)}
        >
            {displayTitle}
            <div className="info-container">
                <div className="digits">{displayDigits}</div>
                <div className="sequence-id">{displaySeq}</div>
            </div>
        </div>
    );
}

export default SearchResult;
