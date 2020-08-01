import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import EmployeeProps from '../../interfaces/employee';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
// get our fontawesome imports
import { faHome, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Employee: React.FC<EmployeeProps> = ({ id, image, name, role, location, phone, email }) => {
  return (
    <Card key={id}>
      <Card.Img src={image} alt="Employee image " />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>{role}</Card.Subtitle>
        <Row >
          <Col xs="auto"><FontAwesomeIcon icon={faHome} /></Col>
          <Col xs="auto">{location}</Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="auto"><FontAwesomeIcon icon={faEnvelope} /></Col>
          <Col xs="auto">{email}</Col>
        </Row>
        <Row className="align-items-center">
          <Col xs="auto"><FontAwesomeIcon icon={faPhone} /></Col>
          <Col xs="auto">{phone}</Col>
        </Row>
        <Row>
          <Button variant="primary">Edit Employee</Button>
        </Row>

      </Card.Body>
    </Card>
  )
}

export default Employee;
