import React, { Component } from "react";
import { RegisterValidation } from "../Component/UserValidationSchema";
import { toast } from 'react-toastify';
import axios from "axios";
import "../Register.css";

const API_URL = "http://localhost:3001/auth/register";
export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            isActive: 0
        }
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RegisterValidation.validate(this.state)
        } catch (err) {
            toast.error(err);
        }
        try {
            const { firstname, lastname, email, password, isActive } = this.state;
            const { data } = await axios.post(API_URL, {
                firstname,
                lastname,
                email,
                password,
                isActive
            });
            toast.success(data.message);
            this.setState({ ...this.state, firstname: "", lastname: "", email: "", password: "" })
        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    render() {
        return (
            <div className="main">
                <div><h3 className="heading">Register</h3></div>

                <form>
                    <div className="registerform">
                        <div className="form-item"><input type="text" name="firstname" value={this.state.firstname} placeholder="First Name" onChange={this.handleChange} className="inputbox" /></div>
                        <div className="form-item"><input type="text" name="lastname" value={this.state.lastname} placeholder="Last Name" onChange={this.handleChange} className="inputbox" /></div>
                        <div className="form-item"><input type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} className="inputbox" /></div>
                        <div className="form-item"><input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} className="inputbox" /></div>
                        <div className="submitDiv"><input type="submit" value="Submit" onClick={this.handleSubmit} className="submitbutton" /></div>
                    </div>
                </form>
            </div>
        )
    }
}