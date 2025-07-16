import { useState } from "react";
import "./page_styles/homepage.css";
import Navbar from "../assets/Navbar";
import Searchbar from "../assets/Searchbar";
import SearchResultsList from "../assets/SearchResultsList";

function Homepage() {
    const [msg, changeMsg] = useState("000045");
    const [txt, changeTxt] = useState("");
    const [allSeqData, changeAllSeqData] = useState();
    const [seqImg, changeSeqImg] = useState();
    const [LMImg, changeLMImg] = useState();
    const [linearCoeffs, setLinearCoeffs] = useState();
    const [QMImg, changeQMImg] = useState();
    const [ExpImg, changeExpImg] = useState();
    const [RationalImg, changeRationalImg] = useState();
    const [RecurrenceImg, changeRecurrenceImg] = useState();
    const [LogImg, changeLogImg] = useState();

    async function getAllSequenceData() {
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
        changeMsg(e.target.value);
        getAllSequenceData();
        console.log(msg);
    }

    function handleLinearCoeffsChange() {}

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

    async function getPicture() {
        const url = `http://localhost:8000/getSeqPNG?seqID=${msg}`;
        changeSeqImg(url);
        console.log(url);
    }

    async function getLinearFitImg() {
        const url = `http://localhost:8000/getSeqLinearModelPNG?seqID=${msg}`;
        changeLMImg(url);
    }

    async function getQuadraticFitImg() {
        const url = `http://localhost:8000/getSeqQuadraticModelPNG?seqID=${msg}`;
        changeQMImg(url);
    }

    async function getExpFitImg() {
        const url = `http://localhost:8000/getSeqExpModelPNG?seqID=${msg}`;
        changeExpImg(url);
    }

    async function getRationalFitImg() {
        const url = `http://localhost:8000/getSeqRationalModelPNG?seqID=${msg}`;
        changeRationalImg(url);
    }

    async function getRecurrenceFitImg() {
        const url = `http://localhost:8000/getSeqRecurrenceModelPNG?seqID=${msg}`;
        changeRecurrenceImg(url);
    }

    async function getLogFitImg() {
        const url = `http://localhost:8000/getSeqLogModelPNG/${msg}`;
        changeLogImg(url);
    }

    async function getAllPictures() {
        await getPicture();
        await getLinearFitImg();
        await getQuadraticFitImg();
        await getExpFitImg();
        await getRationalFitImg();
        await getRecurrenceFitImg();
        await getLogFitImg();
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
                    ></Searchbar>
                    <SearchResultsList results={"hello"}></SearchResultsList>
                    {/* <input
                        type="text"
                        value={msg}
                        onChange={handleMsgChange}
                    ></input>
                    <button onClick={getAllPictures}>Get All</button>
                    <button onClick={getPicture}>Get Picture</button>
                    <button onClick={getLinearFitImg}>Get Linear Model</button>
                    <button onClick={getLinearCoeffs}>Get Linear Coeffs</button> */}
                </div>
                {/* <button onClick={getData}>get (A) File</button>
                <button onClick={getDataB}>get (B) File</button> */}

                {/* <button onClick={getQuadraticFitImg}>
                    Get Quadratic Model
                </button> */}

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
