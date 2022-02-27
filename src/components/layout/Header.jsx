import React from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

export default function Header(){
    
    return ( 
        <header className="header">
            <Link to="/"><h1 className="title">Neoflake task by Manish Swami</h1></Link>
            <AuthOptions />
        </header>
     );
}