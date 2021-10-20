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
import VerifyUser from "./Component/VerifyUser";
import NavbarComponent from "./Component/Navbar";

function App() {
  return (
    <BrowserRouter>

      <Route exact path={[
        '/',
        '/register',
        '/verify/:token',
        '/login',
        '/forgotpassword',
        '/resetpassword/:token'
      ]}>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/verify/:token" component={VerifyUser} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={Password} />
          <Route path="/resetpassword/:token" component={ResetPassword} />

        </Switch>
      </Route>
      <Route exact path={['/dashboard', '/createurl', "/displayurl"]}>
        <ToastContainer />
        <NavbarComponent />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/createurl" component={CreateUrl} />
          <Route path="/displayurl" component={DisplayUrl} />
        </Switch>
      </Route>
    </BrowserRouter>
  );
}

export default App;
