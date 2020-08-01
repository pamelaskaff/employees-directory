import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Employee from '../Employee/employee';
import Home from '../Home/Home';
import EmployeeList from '../EmployeesList/EmployeesList';
import './header.scss';


const Header = () => {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
            <Nav fill variant="tabs" defaultActiveKey="/" >
                <Nav.Item>
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar>
            <Route path="/employees" component={EmployeeList} />
            <Route path="/home" component={Home} />
            <Route path="/employee/:id" component={Employee} />
        </Router>

    )
}

export default Header;
