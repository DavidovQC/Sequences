import { useState } from "react";

function Homepage() {
    const [msg, changeMsg] = useState("000045");
    const [txt, changeTxt] = useState("");
    const [img, changeImg] = useState();

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
        const url = `http://localhost:8000/getPic?seqID=${msg}`;
        changeImg(url);
        console.log(url);
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={msg}
                    onChange={handleMsgChange}
                ></input>
                <button onClick={getData}>get (A) File</button>
                <button onClick={getDataB}>get (B) File</button>
                <button onClick={getPicture}>Get Picture</button>

                <div>
                    <img src={img}></img>
                </div>
            </div>
            <div>{txt}</div>
        </div>
    );
}

export default Homepage;
