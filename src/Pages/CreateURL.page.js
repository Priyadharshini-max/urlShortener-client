import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001/url";

export default function CreateUrl() {
    const [state, setState] = useState({
        longurl: "",
        mailid: "",
        shorturl: ""
    })
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("Token")) {

            history.push({
                pathname: '/login'
            });
        }
    }, []);
    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value, mailid: localStorage.getItem("user") });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        var UrlValidation = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        try {
            if (state.longurl === "") {
                alert("Please enter URL");
            } else if (!UrlValidation.test(state.longurl)) {
                alert("Enter valid URL");
            } else {
                console.log(state);
                const { mailid, longurl } = state;
                const { data } = await axios.post(API_URL, {
                    mailid, longurl
                })
                console.log(data);
                setState({ ...state, shorturl: data.shorturl });
                console.log("state : ", state);
            }
        } catch (err) {
            console.log(err)
        }
    }
    const clearBox = () => {
        setState({ longurl: "", shorturl: "" });
    }

    return (
        <div className="createurlDiv">
            <div> <h3 className="urlHeading"> Enter a long URL to make a TinyURL </h3></div>
            <div><input type="url" name="longurl" className="urlTextbox" placeholder="Enter your long url" value={state.longurl} onChange={handleChange} /> <button type="submit" onClick={handleSubmit} className="urlBtn">Make TinyURL</button></div>
            <div><h3 className="urlHeading">Your TinyURL </h3></div>
            <div><input type="text" name="shorturl" className="urlTextbox" placeholder="Tiny url" value={state.shorturl} onChange={handleChange} /> <button type="button" onClick={clearBox} className="urlBtn">Clear</button> </div>
        </div>
    )
}