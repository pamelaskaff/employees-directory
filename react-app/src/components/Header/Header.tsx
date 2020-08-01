import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from '../Home/Home'


const Header = () => {
    return (
        <Router>
            <Nav fill variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </Nav.Item>
            </Nav>
            <Route path="/home" component={Home} />
        </Router>

    )
}

export default Header;
