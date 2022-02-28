import React, { useContext,useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useIsFocusVisible } from '@mui/material';
import { FormContext } from '../../context/formContext';
function AuthOptions () {
    const [ {user}, setForm ] = useContext(FormContext);
    const history = useHistory();
    const [count, setCount] = useState(0);
    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setForm({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token","");
    };
    useEffect(()=>{
        const getItemsCount = async () => {
            const itemsResponse = await axios.get('https://boiling-inlet-40705.herokuapp.com/items/total');
            console.log(itemsResponse.data.count)
            setCount(itemsResponse.data.count)
          }
        getItemsCount()
    },[])
    return (
        <nav className="auth-options">
            {user ? (
                <>
                    <button className="btn btn-secondary mr-2" >Cart : {count}</button>
                    <button className="btn btn-primary mr-2" onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <button className="btn btn-primary mr-2" onClick={register}>Sign Up</button>
                    <button className="btn btn-primary mr-2" onClick={login}>Login</button>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;