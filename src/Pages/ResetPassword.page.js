import { Button } from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";

const API_URL = "http://localhost:3001/auth/resetpassword";

export default function ResetPassword() {
    const { token } = useParams();

    const [state, setState] = useState({
        password: "",
    })
    const history = useHistory();
    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted..");
        try {
            const { password } = state
            const { data } = await axios.post(API_URL, {
                token,
                password
            })
            setState({ ...state, password: "" });
            history.push('/login');
            toast.success(data.message)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }
    return (

        <div className="main">

            <form>
                <div className="formDiv">
                    <div><h3 className="newpassword">New Password :  </h3></div>
                    <div> <input type="password" name="password" placeholder="Enter your new password" value={state.password} onChange={handleChange} className="inputbox"
                        required /></div>
                    <div>
                        <Button className="passwordBtn" type="submit" onClick={handleSubmit}  >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>

    )
}










