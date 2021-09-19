import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Register from "./Pages/Register.page";
import Login from "./Pages/Login.page";
import Password from "./Pages/Password.page";
import ResetPassword from "./Pages/ResetPassword.page"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Pages/Dashboard.page";
import CreateUrl from "./Pages/CreateURL.page";
import DisplayUrl from "./Pages/AllUrl.page";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/forgotpassword" component={Password} />
        <Route path="/resetpassword/:token" component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/createurl" component={CreateUrl} />
        <Route path="/displayurl" component={DisplayUrl} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
