import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import { FormContext } from '../../context/formContext';

function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const [ {user},setForm ] = useContext(FormContext);
    const history = useHistory();

    useEffect(() => {
        if(user)
            history.push("/");
    }, [user,history]);

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("https://boiling-inlet-40705.herokuapp.com/users/login", loginUser);
            setForm({
                token: loginResponse.data.token,
                user: loginResponse.data.user
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
        
    };
    
    return (
        <div className="login">
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
        </div>
    );
}
 
export default Login;