import { Button } from 'react-bootstrap';
import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';


const API_URL = "http://localhost:3001/auth/forgotpassword";

export default function Password() {
    const [state, setState] = useState({
        email: "",

    })

    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state.email);
        try {
            const { email } = state;
            const { data } = await axios.post(API_URL, {
                email
            });
            setState({ ...state, email: "" });
            console.log(data.message);
            toast.success(data.message);
        }
        catch (error) {
            toast.error(error.response.data.error);
        }
    }
    return (

        <div className="main">
            <form>
                <div className="resetForm">
                    <div><h3 className="passwordtitle"><strong>Enter your mail id</strong></h3></div>
                    <div className="Formfield"><input type="email" name="email" value={state.email} placeholder="Email" onChange={handleChange} className="inputbox" /></div>
                    <div>
                        <Button className="ResetBtn" type="submit" onClick={handleSubmit} >
                            Reset Password
                        </Button>
                    </div>
                </div>
            </form>
        </div>

    )
}





