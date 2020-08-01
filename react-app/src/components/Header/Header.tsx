import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from '../Home/Home'
import EmployeeList from '../EmployeesList/EmployeesList';



const Header = () => {
    return (
        <Router>
            <Nav fill variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav.Item>
            </Nav>
            <Route path="/home" component={EmployeeList} />
        </Router>
    )
}

export default Header;
