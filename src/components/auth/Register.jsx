import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {FormContext} from "../../context/formContext";
import ErrorNotice from "../../components/misc/ErrorNotice";

function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [error, setError] = useState();

    const { form,setForm } = useContext(FormContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try{
            const newUser = {email, password, passwordCheck, displayName};
            await axios.post("https://boiling-inlet-40705.herokuapp.com/users/register", newUser);
            const loginResponse = await axios.post("https://boiling-inlet-40705.herokuapp.com/users/login", {
                email, password
            });
            setForm({
                token: loginResponse.data.token,
                user: loginResponse.data.user,
                roles: loginResponse.data.roles
            });
            // console.log(loginResponse.data.roles)
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
   
    return ( 
        <div className="register">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm password" onChange={e => setPasswordCheck(e.target.value)}/>
                <label>Display name </label>
                <input type="text" id="display-name" onChange={e => setDisplayName(e.target.value)}/>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
        );
}
 
export default Register;