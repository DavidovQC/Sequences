import { useState } from "react";
import "./page_styles/homepage.css";
import Navbar from "../assets/navbar";

function Homepage() {
    const [msg, changeMsg] = useState("000045");
    const [txt, changeTxt] = useState("");
    const [seqImg, changeSeqImg] = useState();
    const [LMImg, changeLMImg] = useState();
    const [linearCoeffs, setLinearCoeffs] = useState();
    const [QMImg, changeQMImg] = useState();
    const [ExpImg, changeExpImg] = useState();
    const [RationalImg, changeRationalImg] = useState();
    const [RecurrenceImg, changeRecurrenceImg] = useState();

    function handleMsgChange(e) {
        changeMsg(e.target.value);
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

    async function getAllPictures() {
        await getPicture();
        await getLinearFitImg();
        await getQuadraticFitImg();
        await getExpFitImg();
        await getRationalFitImg();
        await getRecurrenceFitImg();
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
                    <input
                        type="text"
                        value={msg}
                        onChange={handleMsgChange}
                    ></input>
                    <button onClick={getAllPictures}>Get All</button>
                    <button onClick={getPicture}>Get Picture</button>
                    <button onClick={getLinearFitImg}>Get Linear Model</button>
                    <button onClick={getLinearCoeffs}>Get Linear Coeffs</button>
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
                </div>
            </div>
            <div>{txt}</div>
            <div>{linearCoeffs}</div>
        </div>
    );
}

export default Homepage;
