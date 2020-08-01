import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const fetchEmployees = async () => {
    try {
        return await axios.get(`${baseUrl}/employees`);;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}
