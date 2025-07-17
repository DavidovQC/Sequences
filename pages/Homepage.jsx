import { useEffect, useState } from "react";
import "./page_styles/homepage.css";
import MyNav from "../assets/MyNav";
import Searchbar from "../assets/Searchbar";
import SearchResultsList from "../assets/SearchResultsList";
import { BlockMath, InlineMath } from "react-katex";
import Footer from "../assets/Footer";

function Homepage() {
    // const site = "http://localhost:8000";
    const site = "http://64.227.96.219/OAIS";

    const [msg, changeMsg] = useState("The Fibonacci Sequence");
    const [seq, changeSeq] = useState("");
    const [title, changeTitle] = useState("");

    const [allSeqData, changeAllSeqData] = useState([]);

    const [seqImg, changeSeqImg] = useState();
    const [LMImg, changeLMImg] = useState();
    const [QMImg, changeQMImg] = useState();
    const [ExpImg, changeExpImg] = useState();
    const [RationalImg, changeRationalImg] = useState();
    const [RecurrenceImg, changeRecurrenceImg] = useState();
    const [LogImg, changeLogImg] = useState();

    const [linearCoeffs, setLinearCoeffs] = useState([]);
    const [quadraticCoeffs, setQuadraticCoeffs] = useState([]);
    const [rationalCoeffs, setRationalCoeffs] = useState([]);
    const [exponentialCoeffs, setExponentialCoeffs] = useState([]);
    const [recursiveCoeffs, setRecursiveCoeffs] = useState([]);
    const [logarithmicCoeffs, setLogarithmicCoeffs] = useState([]);

    const [linearString, setLinearString] = useState("");
    const [quadraticString, setQuadraticString] = useState("");
    const [rationalString, setRationalString] = useState("");
    const [exponentialString, setExponentialString] = useState("");
    const [recursiveString, setRecursiveString] = useState("");
    const [logarithmicString, setLogarthmicString] = useState("");

    const [searchBarFocused, setSearchBarFocus] = useState(false);

    async function getAllSequenceData(msg) {
        const url = site + `/getAllSequenceData`;
        try {
            const response = await fetch(url);
            const json = await response.json();

            const results = json.filter((sequence) => {
                return (
                    msg &&
                    sequence &&
                    (sequence.title[0].toLowerCase().includes(msg) ||
                        sequence.data[0]
                            .replace(/\s+/g, "")
                            .includes(msg.replace(/\s+/g, "")))
                );
            });

            changeAllSeqData(results);
            console.log(results);
        } catch (error) {
            console.log(error.message);
        }
    }

    function handleMsgChange(e) {
        const newMsg = e.target.value;
        changeMsg(newMsg);
        getAllSequenceData(newMsg);
        console.log(newMsg);
    }

    function handleSearchBarFocus() {
        setSearchBarFocus(true);
    }

    function handleSearchBarBlur() {
        setTimeout(() => setSearchBarFocus(false), 150); // gives click time to register
    }

    // async function getData() {
    //     const url = `http://localhost:8000/seq?seqID=${msg}`;
    //     try {
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         changeTxt(json);
    //         console.log(json);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // async function getDataB() {
    //     const url = `http://localhost:8000/seqB?seqID=${msg}`;
    //     try {
    //         const response = await fetch(url);
    //         const json = await response.json();
    //         changeTxt(json);
    //         console.log(json);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    async function getPicture(seqID) {
        const url = site + `/getSeqPNG?seqID=${seqID}`;
        changeSeqImg(url);
        console.log(url);
    }

    async function getLinearFitImg(seqID) {
        const url = site + `/getSeqLinearModelPNG?seqID=${seqID}`;
        changeLMImg(url);
    }

    async function getQuadraticFitImg(seqID) {
        const url = site + `/getSeqQuadraticModelPNG?seqID=${seqID}`;
        changeQMImg(url);
    }

    async function getExpFitImg(seqID) {
        const url = site + `/getSeqExpModelPNG?seqID=${seqID}`;
        changeExpImg(url);
    }

    async function getRationalFitImg(seqID) {
        const url = site + `/getSeqRationalModelPNG?seqID=${seqID}`;
        changeRationalImg(url);
    }

    async function getRecurrenceFitImg(seqID) {
        const url = site + `/getSeqRecurrenceModelPNG?seqID=${seqID}`;
        changeRecurrenceImg(url);
    }

    async function getLogFitImg(seqID) {
        const url = site + `/getSeqLogModelPNG/${seqID}`;
        changeLogImg(url);
    }

    async function getAllPictures(seqID) {
        await getPicture(seqID);
        await getLinearFitImg(seqID);
        await getQuadraticFitImg(seqID);
        await getExpFitImg(seqID);
        await getRationalFitImg(seqID);
        await getRecurrenceFitImg(seqID);
        await getLogFitImg(seqID);
    }

    async function clickResult(result) {
        const seqID = result.seqID[0];
        const title = result.title[0];
        const seq = result.data[0];
        const goodSeq = seq.replace(/,/g, ", ") + ",...";
        changeSeq(goodSeq);
        changeTitle(title);
        changeMsg(title);
        changeSeq(goodSeq);

        getLinearCoeffs(seqID);
        getQuadraticCoeffs(seqID);
        getRationalCoeffs(seqID);
        getExponentialCoeffs(seqID);
        getRecursiveCoeffs(seqID);
        getLogarithmicCoeffs(seqID);

        getAllPictures(seqID);
    }

    async function getLinearCoeffs(seqID) {
        const url = site + `/getLinearCoeffs?seqID=${seqID}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const formatted = json.map((elt) => formatScientific(elt));
            setLinearCoeffs(formatted);
            console.log(formatted);
        } catch (error) {
            console.log("Error getting linear coeffs");
        }
    }

    async function getQuadraticCoeffs(seqID) {
        const url = site + `/getQuadraticCoeffs?seqID=${seqID}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const formatted = json.map((elt) => formatScientific(elt));
            setQuadraticCoeffs(formatted);
            console.log(formatted);
        } catch (error) {
            console.log("Error getting quadratic coeffs");
        }
    }

    async function getRationalCoeffs(seqID) {
        const url = site + `/getRationalCoeffs?seqID=${seqID}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            // const formatted = json.map((elt) => formatScientific(elt));
            setRationalCoeffs(json);
            console.log(json);
        } catch (error) {
            console.log("Error getting rational coeffs");
            console.log(error.message);
        }
    }

    async function getExponentialCoeffs(seqID) {
        const url = site + `/getExponentialCoeffs?seqID=${seqID}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const formatted = json.map((elt) => formatScientific(elt));
            setExponentialCoeffs(formatted);
            console.log(formatted);
        } catch (error) {
            console.log("Error getting rational coeffs");
            console.log(error.message);
        }
    }

    async function getRecursiveCoeffs(seqID) {
        const url = site + `/getRecursiveCoeffs?seqID=${seqID}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const formatted = json.map((elt) => formatScientific(elt));
            setRecursiveCoeffs(formatted);
            console.log(json);
        } catch (error) {
            console.log("Error getting recursive coeffs");
            console.log(error.message);
        }
    }

    async function getLogarithmicCoeffs(seqID) {
        const url = site + `/getLogarithmicCoeffs?seqID=${seqID}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const formatted = json.map((elt) => formatScientific(elt));
            setLogarithmicCoeffs(formatted);
            console.log(json);
        } catch (error) {
            console.log("Error getting logarithmic coeffs");
            console.log(error.message);
        }
    }

    function formatScientific(num) {
        num = Number(num);
        if (typeof num !== "number" || isNaN(num)) return "NaN";

        const absNum = Math.abs(num);

        // Use scientific notation if the number is too large or too small
        if (absNum >= 1e5 || (absNum < 1e-3 && absNum !== 0)) {
            const exponent = Math.floor(Math.log10(absNum));
            const mantissa = (num / Math.pow(10, exponent)).toFixed(2); // 3 significant digits

            return `${mantissa} \\times 10^{${exponent}}`;
        } else {
            return num.toFixed(2); // fixed-point format
        }
    }

    function createRationalString() {
        const numerator = rationalCoeffs.numerator;
        const denominator = rationalCoeffs.denominator;

        return `y = \\frac{${formatScientific(
            numerator[0]
        )}x^3+${formatScientific(numerator[1])}x^2+${formatScientific(
            numerator[2]
        )}x+${formatScientific(numerator[3])}}{${formatScientific(
            denominator[0]
        )}x^3+${formatScientific(denominator[1])}x^2+${formatScientific(
            denominator[2]
        )}x+${formatScientific(denominator[3])}}`;
    }

    function createLinearString() {
        setLinearString(`y= ${linearCoeffs[1]}x+${linearCoeffs[0]}`);
    }

    function createQuadraticString() {
        setQuadraticString(
            `y= ${quadraticCoeffs[2]}x^2+${quadraticCoeffs[1]}x+${quadraticCoeffs[0]}`
        );
    }

    function createExponentialString() {
        setExponentialString(
            `y=${Math.abs(exponentialCoeffs[0])}e^{${exponentialCoeffs[1]}}`
        );
    }

    function createRecursiveString() {
        setRecursiveString(
            `y=x_{n}=${recursiveCoeffs[0]}x_{n-1}+${recursiveCoeffs[1]}x_{n-2}`
        );
    }

    function createLogarithmicString() {
        setLogarthmicString(
            `y=${logarithmicCoeffs[0]}ln(x)+${logarithmicCoeffs[1]}`
        );
    }

    useEffect(() => {
        if (
            rationalCoeffs?.numerator?.length >= 4 &&
            rationalCoeffs?.denominator?.length >= 4
        ) {
            setRationalString(createRationalString());
        }

        if (linearCoeffs?.length > 0) {
            createLinearString();
        }

        if (quadraticCoeffs?.length > 0) {
            createQuadraticString();
        }

        if (recursiveCoeffs?.length > 0) {
            createRecursiveString();
        }

        if (exponentialCoeffs?.length > 0) {
            createExponentialString();
        }

        if (logarithmicCoeffs?.length > 0) {
            createLogarithmicString();
        }
    }, [
        rationalCoeffs,
        linearCoeffs,
        quadraticCoeffs,
        recursiveCoeffs,
        exponentialCoeffs,
        logarithmicCoeffs,
    ]);

    return (
        <div>
            <div className="homepage-container">
                <MyNav></MyNav>
                <div>
                    <div className="fetch-section">
                        <Searchbar
                            value={msg}
                            onChange={handleMsgChange}
                            possibilites={allSeqData}
                            onFocus={() => handleSearchBarFocus()}
                            onBlur={() => handleSearchBarBlur()}
                        ></Searchbar>
                        {searchBarFocused && (
                            <SearchResultsList
                                results={allSeqData}
                                performOnClick={clickResult}
                            ></SearchResultsList>
                        )}
                    </div>

                    <div className="title-container">{title}</div>
                    <div className="sequence-container">{seq}</div>

                    <div className="main-image">
                        <img src={seqImg}></img>
                    </div>
                    <div className="polynomial-fits">
                        <div className="linear-model small-graph-container">
                            <img src={LMImg}></img>
                            <p>
                                <InlineMath math={linearString}></InlineMath>
                            </p>
                        </div>

                        <div className="quadratic-model small-graph-container">
                            <img src={QMImg}></img>
                            <p>
                                <InlineMath math={quadraticString}></InlineMath>
                            </p>
                        </div>

                        <div className="rational-model small-graph-container">
                            <img src={RationalImg}></img>
                            <p>
                                <InlineMath math={rationalString}></InlineMath>
                            </p>
                        </div>
                    </div>
                    <div className="other-fits">
                        <div className="exponential-model small-graph-container">
                            <img src={ExpImg}></img>
                            <InlineMath math={exponentialString}></InlineMath>
                        </div>

                        <div className="recursive-model small-graph-container">
                            <img src={RecurrenceImg}></img>
                            <InlineMath math={recursiveString}></InlineMath>
                        </div>

                        <div className="logarithmic-model small-graph-container">
                            <img src={LogImg}></img>
                            <InlineMath math={logarithmicString}></InlineMath>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-section"></div>
        </div>
    );
}

export default Homepage;
