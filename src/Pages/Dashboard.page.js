import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';

export default function Dashboard() {
    const history = useHistory();
    const [state, setState] = useState({
        urlCount: []
    });

    useEffect(() => {
        if (!localStorage.getItem("Token")) {
            history.push({
                pathname: '/login'
            });
        } else {
            getURL();
        }

    }, []);


    const getURL = async () => {
        try {
            var { data } = await axios.get("http://localhost:3001/url");
            console.log(data);
            setState({ ...state, urlCount: data });
            console.log("StateData", state.urlCount);
            data.map((item, index) => {
                console.log(item._id.date, item.totalUrl);
            });

        }

        catch (err) {
            console.log(err);
            // toast.error(err.response.data.error);
        }
    }

    return (

        <div className="dashboard">
            <div className="dashboardBtns">
                <div><Link to="/createurl"><button className="dashboardBtn">Create Short URL</button></Link>
                    <span><Link to="/displayurl"><button className="dashboardBtn">Display all short URL</button></Link></span>
                </div>

            </div>
            <div><h3 className="dashboardHeading">Total number of url created per day </h3></div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.urlCount.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item._id.date}</td>
                                    <td>{item.totalUrl}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}