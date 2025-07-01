import { useState } from "react";
import "./page_styles/homepage.css";

function Homepage() {
    const [msg, changeMsg] = useState("000045");
    const [txt, changeTxt] = useState("");
    const [seqImg, changeSeqImg] = useState();
    const [LMImg, changeLMImg] = useState();
    const [QMImg, changeQMImg] = useState();

    function handleMsgChange(e) {
        changeMsg(e.target.value);
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

    async function getAllPictures() {
        await getPicture();
        await getLinearFitImg();
        await getQuadraticFitImg();
    }

    return (
        <div>
            <div>
                <div className="fetch-section">
                    <input
                        type="text"
                        value={msg}
                        onChange={handleMsgChange}
                    ></input>
                    <button onClick={getAllPictures}>Get All</button>
                </div>
                {/* <button onClick={getData}>get (A) File</button>
                <button onClick={getDataB}>get (B) File</button>
                <button onClick={getPicture}>Get Picture</button>
                <button onClick={getLinearFitImg}>Get Linear Model</button>
                <button onClick={getQuadraticFitImg}>
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
                </div>
            </div>
            <div>{txt}</div>
        </div>
    );
}

export default Homepage;
