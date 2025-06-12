import { useState } from "react";

function Homepage() {
    const [msg, changeMsg] = useState("A000045");
    const [txt, changeTxt] = useState("");

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

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={msg}
                    onChange={handleMsgChange}
                ></input>
                <button onClick={getData}>get data</button>
            </div>
            <div>{txt}</div>
        </div>
    );
}

export default Homepage;
