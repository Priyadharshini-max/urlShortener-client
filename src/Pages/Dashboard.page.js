import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
            setState({ ...state, urlCount: data });
        }

        catch (err) {
            console.log(err);
            // toast.error(err.response.data.error);
        }
    }

    return (

        <div className="dashboard">
            <div><p className="dashboardHeading">Total number of url created per day </p></div>
            <Table striped bordered hover variant="dark">
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
            </Table>
        </div>
    )
}