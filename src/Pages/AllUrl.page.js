import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Table from 'react-bootstrap/Table';

export default function DisplayUrl() {
    const [state, setState] = useState({
        url: []
    });

    const history = useHistory();

    useEffect(async () => {
        if (localStorage.getItem("user")) {
            const data = await getURL();
            setState({ ...state, url: data });
            console.log("url: ", state.url);
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
            console.log(data);
            return data;

        }
        catch (err) {
            toast.error(err.response.data.error);
        }
    }

    return (
        <div className="shorturlDiv">
            <h1>Short Url</h1>
            {state.url.length === 0 ? <h3 className="shorturlEmpty">Short URL is Empty  </h3> :

                (
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Short URL</th>
                                <th>Clicked Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.url.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{item.shorturl}</td>
                                            <td>{item.count}</td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </Table>
                )



            }
        </div>
    )
}