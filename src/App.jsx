import React, {useState, useEffect,useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { FormContext,FormProvider } from './context/formContext';
import './App.css';

function App() {

  useEffect(() => {
    
  }, []);

  return (
    <BrowserRouter>
      <FormProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
        </FormProvider>
    </BrowserRouter>
  );
}

export default App;
