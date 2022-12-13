import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import * as XLSX from "xlsx";

const ListEmployeeComponent = () => {
    
   
    const [employees, setEmployees] = useState([])
    
    useEffect(() => {

        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteEmployee = (employee_id) => {
       EmployeeService.deleteEmployee(employee_id).then((response) =>{
        getAllEmployees()
        console.log(response.data);

       }).catch(error =>{
           console.log(error);
       })
        
    }

//fetch data from excel-sheet
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];
    
            const data = XLSX.utils.sheet_to_json(ws);
    
            resolve(data);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    
        promise.then((employee) => {
          console.log(employee);
          setEmployees(employee);
        //   if(employee.length<51){
        //   setEmployees(employee);
        //   }
        //   else{
        //     alert("Can not upload more than 50 records at a time")
        //   }
        });
      };

//Upload data from excel to database
      const uploadHandler = () => { 
        if(employees.length<51){  
        EmployeeService.uploadEmployee(employees).then((response)=>{
                console.log(response.data)
                alert("Uploaded.. please refresh the page to see all employee data ")

        }).catch(error => {
            console.log(error)  
        })
    }
    else{
        alert("Can not upload more than 50 records at a time")
    }
    }   
//Exporting data from database to excel 
        const exportHandler =() =>{
            var wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(employees);
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, "Employee.xlsx");
            alert('Downloading')
        }



    return (
        <div className = "container ">
            <h2 className = "text-center mt-5 text-dark " > EMPLOYEE DETAILS </h2>

            <Link to = "/add-employee" 
                  className = "btn btn-dark btn-outline-light shadow-lg"> ADD EMPLOYEE </Link>

            <button className='btn btn-dark btn-outline-light shadow-lg' 
                    style={{marginLeft:'92%',marginTop:'-10%',marginBottom:'-6%',}}
                    onClick = {(e) => uploadHandler(e)}>UPLOAD</button><br></br>

            <button className='btn btn-secondary btn-outline-light shadow-lg' 
                    style={{marginLeft:'89.5%',marginTop:'-5%',marginBottom:'-10%'}}
                    onClick = {(e) => exportHandler(e)}>DOWNLOAD</button>

            <input
                className = "btn btn-secondary btn-outline-light mb-2 btn-sm shadow-lg"
                type="file"
                onChange={(e) => {const file = e.target.files[0]; readExcel(file);}}
            />

            <table className="table shadow-lg card-header table-secondary table-bordered table-hover table-lg text-dark bg-secondary ">
                <thead className = "text-center bg-light">
                            <th>Employee Id</th>
                            <th>Employee Name </th>
                            <th>Employee Status </th>
                            <th>Designation </th>
                            <th>Base Location </th>
                            <th>Company Name </th>
                            <th>Manager Name </th>
                            <th>Start Date </th>
                            <th>End Date </th>
                            <th>Actions</th>
                </thead>
                <tbody className = "text-center text-dark">
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}> 
                                <td>{employee.employee_id}</td>
                                <td>{employee.employee_name}</td>
                                <td>{employee.employee_status}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.base_location}</td>
                                <td>{employee.company_name}</td>
                                <td>{employee.manager_name}</td>
                                <td>{employee.startDate}</td>
                                <td>{employee.endDate}</td>
                                <td>
                                <Link className="btn btn-light btn-sm btn-outline-primary" 
                                        style = {{marginLeft:"4px" ,marginBottom:"2px",padding:"1px"}} 
                                        to={`/edit-employee/${employee.employee_id}`}>UPDATE</Link>
                                                <br></br>
                                <button className = "btn btn-light btn-sm btn-outline-danger" 
                                        onClick = {() => deleteEmployee(employee.employee_id)}
                                        style = {{marginLeft:"4px",padding:"3px"}}> DELETE</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent;