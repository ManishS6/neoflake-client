import { Pagination } from '@mui/material';
import React, { useState,useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {FormContext} from '../../context/formContext';
import {Container,Row,Col,Card,Button} from 'react-bootstrap';
import axios from "axios";

function Home () {
    const [{user,token,currentPage=0},setForm] = useContext(FormContext);
    const history = useHistory();
    const [items, setItems] = useState([])
    const [pages, setPages] = useState(10)
    const changeHandler = (event,page) => {
        console.log(page)
        var updatedForm = {currentPage: page}
        setForm(form => ({
            ...form,
            ...updatedForm
        }))
    }
    
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");
            if(token === null){
              localStorage.setItem("auth-token", "");
              token = "";
            }
            const tokenResponse = await axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {"x-auth-token": token}});
            if (tokenResponse.data) {
              const userRes = await axios.get("http://localhost:5000/users/", {
                headers: { "x-auth-token": token },
              });
              var updatedForm = { token,user: userRes.data.user}
              setForm(form => ({
                ...form,
                ...updatedForm
            }))
            }
        }
        checkLoggedIn()
        if(!user) history.push("/login");
        const getItems = async () => {
            if(currentPage===0){
                const itemsResponse = await axios.get("http://localhost:5000/items");
                console.log(itemsResponse.data)
                setItems(itemsResponse.data)
            } else {
                const itemsResponse = await axios.get(`http://localhost:5000/items?page=${currentPage}`);
                console.log(itemsResponse.data)
                setItems(itemsResponse.data)
            }
        }
        getItems()
        const getTotalPages = async () => {
            const pageResponse  = await axios.get("http://localhost:5000/users/total", {
                headers: { "x-auth-token": token },
              });
            setPages(Math.ceil(parseInt(pageResponse.data.count)/4))
        }
        getTotalPages()
    }, [currentPage]);
    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome {user.displayName}</h1>
                    <div style={{margin:'1px',padding:'2px'}}>
                        <Container>
                            <Row>
                            {[...items].map((item)=>(
                                <Col key={item._id}>
                                    <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>{item.description}</Card.Text>
                                        <Button variant="primary">ADD to Cart</Button>
                                    </Card.Body>
                                    </Card>
                                </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                    <Pagination count={pages} onChange={changeHandler}></Pagination>
                </>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
}
 
export default Home;