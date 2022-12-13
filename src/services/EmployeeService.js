import axios from 'axios'

const GET_ALLEMP = 'http://localhost:8080/allemployee';

const POST_EMP = 'http://localhost:8080/postEmp';

const UPDATE_EMP = 'http://localhost:8080/employeeUpdate';

const DELETE_EMP = 'http://localhost:8080/employee';

const GET_BYEMPID = 'http://localhost:8080/getemployee';

const UPLOAD_EMP = 'http://localhost:8080/postAllEmp';

class EmployeeService{

    getAllEmployees(){
        return axios.get(GET_ALLEMP)
    }

    uploadEmployee(employee){
        return axios.post(UPLOAD_EMP, employee);
    }

    createEmployee(employees){
        return axios.post(POST_EMP, employees)
    }

    getEmployeeById(employee_id){
        return axios.get(GET_BYEMPID + '/' + employee_id);
    }

    updateEmployee(employee_id, employee){
        return axios.put(UPDATE_EMP + '/' + employee_id, employee);
    }

    deleteEmployee(employee_id){
        return axios.delete(DELETE_EMP + '/' + employee_id);
    }
}

export default new EmployeeService();