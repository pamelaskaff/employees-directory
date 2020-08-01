import React, { useState, useEffect } from 'react';
import Employee from '../Employee/employee'
import CardColumns from 'react-bootstrap/CardColumns';
import Spinner from 'react-bootstrap/Spinner';
import EmployeeProps from '../../interfaces/employee';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState<EmployeeProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getEmployees = async () => {
            setLoading(true);
            const res = await axios.get(`https://randomuser.me/`);
            if (res.status !== 200) setError(true);
            setEmployees(res.data);
            setLoading(false);
        }
        getEmployees();
    }, []);

    const data = [
        { "id": "1", "name": "Pamela", "age": 22, "role": "Software Engineer", "salary": 2000, "phone": "+96170118903", "email": "pameela-skaff@hotmail.com", "location": "UK", "image": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png" },
        { "id": "2", "name": "Toufik", "age": 29, "role": "Software Engineer", "salary": 2000, "phone": "+96170118903", "email": "toufik@hotmail.com", "location": "UAE", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        { "id": "3", "name": "Georges", "age": 17, "role": "Head of Engineeering", "salary": 2000, "phone": "+96170118903", "email": "kskdkd", "location": "EGYPT", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        { "id": "4", "name": "Nada", "age": 33, role: "Team lead", salary: 4000, "phone": "+96170118903", "email": "kskdkd", "location": "MENA", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        { "id": "5", "name": "Christelle", "age": 32, "role": "Human resources", "salary": 2000, "phone": "+96170118903", "email": "kskdkd", "location": "USA", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        { "id": "6", "name": "Ali", "age": 22, "role": "Software Engineer", "salary": 2000, "phone": "+96170118903", "email": "kskdkd", "location": "Beirut", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" }
    ];


    const employeesList = data
        .map((employee) => {
            return (
                <Employee key={employee.id} {...employee} />
            )
        })
    if (loading) {
        return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
    }
    else if (error) {
        return <p>Error Fetching employees</p>
    }


    return <React.Fragment>
        <CardColumns>{employeesList}</CardColumns>
    </React.Fragment>
}
export default EmployeeList


