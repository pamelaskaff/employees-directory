import axios from 'axios';
import EmployeeProps from '../interfaces/employee';

const baseUrl = 'http://localhost:8080';

export const fetchEmployees = async () => {
    try {
        return await axios.get(`${baseUrl}/employees`);;
    } catch (error) {
        console.log("error : ", error);
        throw error;
    }
}

export const createEmployee = async (employee: EmployeeProps) => {
    try {
        return axios.post(`${baseUrl}/employees`, employee);
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}