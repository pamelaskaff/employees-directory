import React, { useState, useEffect } from 'react';
import Employee from '../Employee/employee'
import CardColumns from 'react-bootstrap/CardColumns';
import Spinner from 'react-bootstrap/Spinner';
import EmployeeProps from '../../interfaces/employee';
import axios from 'axios';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const EmployeeList = () => {
    const [employees, setEmployees] = useState<EmployeeProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [inputFilter, setInputFilter] = useState('');
    const itemFilter = (event: any) => setInputFilter(event.target.value.toLocaleLowerCase());


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

    const isInName = (employee: EmployeeProps) => isMatch('name', employee);
    const isInRole = (employee: EmployeeProps) => isMatch('role', employee);
    const isInLocation = (employee: EmployeeProps) => isMatch('location', employee);
    const isMatch = (type: string, employee: any) => employee[type] ? employee[type].toLocaleLowerCase().includes(inputFilter) : null

    const data = [
        { "id": "1", "name": "Pamela", "age": 22, "role": "Software Engineer", "salary": 2000, "phone": "+96170118903", "email": "pameela-skaff@hotmail.com", "location": "UK", "image": "https://picsum.photos/id/1012/3973/263" },
        { "id": "2", "name": "Toufik", "age": 29, "role": "Software Engineer", "salary": 2000, "phone": "+96170118903", "email": "toufik@hotmail.com", "location": "UAE", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        { "id": "3", "name": "Georges", "age": 17, "role": "Head of Engineeering", "salary": 2000, "phone": "+96170118903", "email": "kskdkd", "location": "EGYPT", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        { "id": "4", "name": "Nada", "age": 33, role: "Team lead", salary: 4000, "phone": "+96170118903", "email": "kskdkd", "location": "MENA", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        {"id": "5", "name": "Christelle", "age": 32, "role": "Human resources", "salary": 2000, "phone": "+96170118903", "email": "kskdkd", "location": "USA", "image": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"},
        { "id": "6", "name": "Ali", "age": 22, "role": "Software Engineer", "salary": 2000, "phone": "+96170118903", "email": "kskdkd", "location": "Beirut", "image": "https://homepages.cae.wisc.edu/~ece533/images/girl.png" }
    ];




    const employeesList = data.filter(employee => isInName(employee) || isInRole(employee) || isInLocation(employee))
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
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Filter</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Filter by Location, Name or Role"
                    aria-label="filterText"
                    aria-describedby="basic-addon1"
                    onChange={itemFilter}
                />
            </InputGroup>
            <CardColumns>{employeesList}</CardColumns>
        </div>
    </React.Fragment>
}
export default EmployeeList


