import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createEmployee } from '../../api/EmployeeApi';
import Spinner from 'react-bootstrap/Spinner';


function AddModal(props: any) {
  const [loading, setShowLoading] = useState(false);
  const [employee, setEmployee] = useState({ id: "", name: "", role: "", location: "UK", email: "", phone: "", image: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png", age: 22 });
  const [validated, setValidated] = useState(false);
  const reload = () => window.location.reload(false);


  const addEmployee = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    setShowLoading(true);
    const data = {
      id: employee.id,
      name: employee.name,
      role: employee.role,
      location: employee.location,
      email: employee.email,
      phone: employee.phone,
      image: employee.image,
      age: employee.age
    };

    const response = await createEmployee(data);
    if (response.status === 200) {
      setEmployee(response.data);
      setShowLoading(false);
    }
    props.onHide();
    reload();
  };

  const onChange = (e: any) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  }

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form validated={validated} onSubmit={addEmployee}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" role="form">
            <Form.Label>Name</Form.Label>
            <Form.Control value={employee.name} name='name' type="text" placeholder="Enter Name" required onChange={onChange} />
            <Form.Control.Feedback type="invalid">
              Please provide a Name.
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" placeholder="Enter Role" name='role' value={employee.role} onChange={onChange} required />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Office Location</Form.Label>
            <Form.Control placeholder="Choose location" as="select" value={employee.location} name='location' onChange={onChange} required>
              <option>UK</option>
              <option>UAE</option>
              <option>MENA</option>
              <option>USA</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email Adress" value={employee.email} onChange={onChange} name='email' required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
                </Form.Text>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" placeholder="Enter Phone Number" value={employee.phone} onChange={onChange} name='phone' required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide} className="float-right">Close</Button>
          <Button variant="primary" type="submit" className="float-right">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddModal;
