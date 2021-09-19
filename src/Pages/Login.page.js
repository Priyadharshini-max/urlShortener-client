import React, { Component } from "react";
import { LoginValidation } from "../Component/UserValidationSchema";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import axios from "axios";
import "../login.css";

const API_URL = "http://localhost:3001/auth/login";

export default class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }
    componentDidMount = () => {
        console.log(this.props)
    }
    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await LoginValidation.validate(this.state);
            try {
                const { email, password } = this.state;
                var { data } = await axios.post(API_URL, {
                    email,
                    password
                });
                const tokenValue = data.token;
                localStorage.setItem("Token", tokenValue);
                localStorage.setItem("user", email);
                this.props.history.push("/dashboard");
            }
            catch (err) {
                toast.error(err.response.data.error);
            }
        } catch (err) {
            toast.error(err.errors[0]);
        }
    }

    render() {
        return (
            <div className="main">
                <div><h3>Login</h3></div>
                <form>
                    <div className="loginform">
                        <div className="textbox"><input type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} className="inputfield" /></div>
                        <div className="textbox"><input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} className="inputfield" /></div>
                        <div className="registerlink">Are you new to this app? <span><Link to="/register">Register here</Link></span> </div>
                        <div className="passwordlink"><Link to="/forgotpassword" className="passwordLink">Forgot Password?</Link> </div>
                        <div className="submitdiv"><input type="submit" value="Submit" onClick={this.handleSubmit} className="submitbtn" /></div>
                    </div>
                </form>
            </div>
        )
    }
}