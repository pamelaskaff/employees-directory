import React, { useState, useEffect } from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Pagination from '../Pagination/pagination';
import Employee from '../Employee/employee';
import EmployeeProps from '../../interfaces/employee';
import AddModal from '../Employee/AddEmployee';
import { fetchEmployees } from '../../api/EmployeeApi';
import './EmployeesList.scss';


const EmployeeList = () => {
    const [employees, setEmployees] = useState<EmployeeProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [inputFilter, setInputFilter] = useState('');
    const itemFilter = (event: any) => setInputFilter(event.target.value.toLocaleLowerCase());
    const [currentPage, setcurrentPage] = useState(1);
    const employeesPerPage = 3;
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    //Change Page
    const paginate = (pageNumber: number) => setcurrentPage(pageNumber);

    useEffect(() => {
        const getEmployees = async () => {
            setLoading(true);
            const res = await fetchEmployees();
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

    //Filter Employees by name location or role
    const employeesFilteredList = employees.filter(employee => isInName(employee) || isInRole(employee) || isInLocation(employee))
        .map((employee) => {
            return (
                <Employee key={employee.id} {...employee} />
            )
        });

    // Get current employees in the selected page
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employeesFilteredList.slice(indexOfFirstEmployee, indexOfLastEmployee);

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
            <CardColumns>{currentEmployees}</CardColumns>
            <Button onClick={handleShowModal}><FontAwesomeIcon icon={faPlusCircle} /></Button>
            <Pagination employeesPerPage={employeesPerPage} totalEmployees={employeesFilteredList.length} paginate={paginate} activePage={currentPage} />
            <AddModal show={showModal} onHide={handleCloseModal} />
        </div>
    </React.Fragment>
}
export default EmployeeList;
