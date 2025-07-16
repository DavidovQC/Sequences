import { useState } from "react";
import "./page_styles/homepage.css";
import Navbar from "../assets/Navbar";
import Searchbar from "../assets/Searchbar";
import SearchResultsList from "../assets/SearchResultsList";

function Homepage() {
    const [msg, changeMsg] = useState("000045");
    const [txt, changeTxt] = useState("");
    const [allSeqData, changeAllSeqData] = useState([]);
    const [seqImg, changeSeqImg] = useState();
    const [LMImg, changeLMImg] = useState();
    const [linearCoeffs, setLinearCoeffs] = useState();
    const [QMImg, changeQMImg] = useState();
    const [ExpImg, changeExpImg] = useState();
    const [RationalImg, changeRationalImg] = useState();
    const [RecurrenceImg, changeRecurrenceImg] = useState();
    const [LogImg, changeLogImg] = useState();
    const [searchBarFocused, setSearchBarFocus] = useState(false);

    async function getAllSequenceData(msg) {
        const url = `http://localhost:8000/getAllSequenceData`;
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

    async function getData() {
        const url = `http://localhost:8000/seq?seqID=${msg}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            changeTxt(json);
            console.log(json);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getDataB() {
        const url = `http://localhost:8000/seqB?seqID=${msg}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            changeTxt(json);
            console.log(json);
        } catch (error) {
            console.log(error.message);
        }
    }

    async function getPicture(seqID) {
        const url = `http://localhost:8000/getSeqPNG?seqID=${seqID}`;
        changeSeqImg(url);
        console.log(url);
    }

    async function getLinearFitImg(seqID) {
        const url = `http://localhost:8000/getSeqLinearModelPNG?seqID=${seqID}`;
        changeLMImg(url);
    }

    async function getQuadraticFitImg(seqID) {
        const url = `http://localhost:8000/getSeqQuadraticModelPNG?seqID=${seqID}`;
        changeQMImg(url);
    }

    async function getExpFitImg(seqID) {
        const url = `http://localhost:8000/getSeqExpModelPNG?seqID=${seqID}`;
        changeExpImg(url);
    }

    async function getRationalFitImg(seqID) {
        const url = `http://localhost:8000/getSeqRationalModelPNG?seqID=${seqID}`;
        changeRationalImg(url);
    }

    async function getRecurrenceFitImg(seqID) {
        const url = `http://localhost:8000/getSeqRecurrenceModelPNG?seqID=${seqID}`;
        changeRecurrenceImg(url);
    }

    async function getLogFitImg(seqID) {
        const url = `http://localhost:8000/getSeqLogModelPNG/${seqID}`;
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
        getAllPictures(seqID);
    }

    async function getLinearCoeffs() {
        const url = `http://localhost:8000/getLinearCoeffs?seqID=${msg}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            setLinearCoeffs(json.toString());
            console.log(json);
        } catch (error) {
            console.log("Error getting linear coeffs");
        }
    }

    return (
        <div>
            <Navbar></Navbar>
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

                <div className="main-image">
                    <img src={seqImg}></img>
                </div>
                <div className="polynomial-fits">
                    <div>
                        <img src={LMImg}></img>
                    </div>

                    <div>
                        <img src={QMImg}></img>
                    </div>

                    <div>
                        <img src={ExpImg}></img>
                    </div>
                </div>
                <div className="other-fits">
                    <div>
                        <img src={RationalImg}></img>
                    </div>

                    <div>
                        <img src={RecurrenceImg}></img>
                    </div>

                    <div>
                        <img src={LogImg}></img>
                    </div>
                </div>
            </div>
            <div>{txt}</div>
            <div>{linearCoeffs}</div>
        </div>
    );
}

export default Homepage;
