import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

export default function DisplayUrl() {
    const [state, setState] = useState({
        url: []
    });

    const history = useHistory();

    useEffect(async () => {
        if (localStorage.getItem("user")) {
            const url = await getURL();
            setState({ ...state, url });
            console.log(state.url);
            console.log("DisplayUrl");
        } else {
            history.push({
                pathname: '/login'
            });
        }

    }, []);
    const getURL = async () => {
        try {
            var { data } = await axios.get("http://localhost:3001/displayurlroute", {
                headers: {
                    "access-token": localStorage.getItem("Token")
                }
            });
            return data;
        }
        catch (err) {
            console.log(err);
            // toast.error(err.response.data.error);
        }
    }

    return (
        <>
            <h1>Short Url</h1>
            {state.url.map((item, index) => {
                return (
                    <h3 key={index}>{item.shorturl}</h3>
                )
            })}
        </>
    )
}