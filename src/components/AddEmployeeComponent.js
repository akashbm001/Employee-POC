import React, {useState, useEffect} from 'react'
import {Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'
import { EXCEL_FILE_BASE64 } from './Constants';
import FileSaver from "file-saver";

const AddEmployeeComponent = () => {


    const [employee_id,setEmployee_id]=useState("")
    const [employee_name,setEmployee_name]=useState("")
    const [employee_status,setEmployee_status]=useState("")
    const [designation,setDesignation]=useState("")
    const [base_location,setBase_location]=useState("")
    const [company_name,setCompany_name]=useState("")
    const [manager_name,setManager_name]=useState("")
    const [startDate,setStartDate]=useState("")
    const [endDate,setEndDate]=useState("")
    const [error,setError]=useState(false)
    const history = useHistory();
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

         const employee = {employee_id, employee_name, employee_status, designation, base_location, company_name, manager_name, startDate, endDate}
    if(employee_id&&employee_name&&employee_status&&designation&&base_location&&company_name&&manager_name&&startDate&&endDate){
        if(id){
            EmployeeService.updateEmployee(employee_id, employee).then((response) => {
                console.log(response.data)
                history.push('/employees')
                alert("Updated")
            
            })
            .catch(error => {
                console.log(error)
            })

        }else{
            EmployeeService.createEmployee(employee).then((response) =>{

                console.log(response.data)
    
                history.push('/employees');
                alert("New employee added")
    
            }).catch(error => {
                console.log(error)
            })
        
    }
        
    }
    if(employee_id.length==0||employee_name.length==0||employee_status.length==0||designation.length==0||
        base_location.length==0||company_name.length==0||manager_name.length==0||startDate.length==0||endDate.length==0)
        setError(true)
}

    useEffect(() => {

        EmployeeService.getEmployeeById(id).then((response) =>{

            setEmployee_id(response.data.employee_id)
            setEmployee_name(response.data.employee_name)
            setEmployee_status(response.data.employee_status)
            setDesignation(response.data.designation)
            setBase_location(response.data.base_location)
            setCompany_name(response.data.company_name)
            setManager_name(response.data.manager_name)
            setStartDate(response.data.startDate)
            setEndDate(response.data.endDate)
        }).catch(error => {
            console.log(error)
        })
    },[])

    const title = () => {

        if(id){
            return <h2 className = "text-center ">UPDATE EMPLOYEE</h2>
        }else{
            return <h2 className = "text-center ">ADD NEW EMPLOYEE</h2>
        }
    }
//excel templete download
    const downloadHandler=()=>{
        let sliceSize = 1024;
        let byteCharacters = atob(EXCEL_FILE_BASE64);
        let bytesLength = byteCharacters.length;
        let slicesCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array(slicesCount);
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
          let begin = sliceIndex * sliceSize;
          let end = Math.min(begin + sliceSize, bytesLength);
          let bytes = new Array(end - begin);
          for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
          }
          byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        FileSaver.saveAs(
          new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
          "Emp-Excel-Templete.xlsx"
        );
    }


    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "shodow-lg">
                    <div className = "card shadow-lg mb-2 col-md-10 offset-md-1  bg-secondary text-light">
                       {
                           title()
                       }
                       <button className='btn shadow-lg btn-sm mb-3 btn-seccondry btn-outline-light ' onClick={downloadHandler}>CLICK here to download excel-templete for adding employees in bulk</button>
                        <div className = "card-body ">
                            <form >
                                <div className = "form-group mb-2 col-md-3 " >
                                    <label className = "form-label " > Employee Id </label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter 6-digit employee id"
                                        name = "employee_id"
                                        className = "form-control"
                                        value = {employee_id}
                                        onChange = {(e) => setEmployee_id(e.target.value)}
                                    >  
                                    </input>
                                    {error&&employee_id.length<=0?
                                    <lable className='text-warning'>Employee Id can't be empty</lable>:""}
                                    
                                </div>

                                <div className = "form-group mb-2 col-md-3  offset-md-4" style={{marginTop:'-9%'}}>
                                    <label className = "form-label "> Employee name </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter employee name"
                                        name = "employee_name"
                                        className = "form-control"
                                        value = {employee_name}
                                        onChange = {(e) => setEmployee_name(e.target.value)}
                                    >
                                    </input>
                                    {error&&employee_name.length<=0?
                                    <lable className='text-warning'>Employee name can't be empty</lable>:""}
                                </div>

                                <div className = "form-group mb-2 col-md-3 offset-md-8" style={{marginTop:'-9%'}}>
                                    <label className = "form-label"> Employee status </label>
                                    <select
                                        className = "form-control"
                                        value = {employee_status}
                                        onChange = {(e) => setEmployee_status(e.target.value)}>
                                            <option selected disabled value="">Click here to select</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                    </select>
                                    {error&&employee_status.length<=0?
                                    <lable className='text-warning'>Employee status can't be empty</lable>:""}
                                </div>

                                <div className = "form-group mb-2 col-md-3" style={{marginTop:'4%'}}>
                                    <label className = "form-label"> Designation </label>
                                    <select
                                        className = "form-control"
                                        value = {designation}
                                        onChange = {(e) => setDesignation(e.target.value)}>
                                             <option selected disabled value="">Click here to select</option>
                                            <option>Analyst</option>
                                            <option>HR</option>
                                            <option>Senior Analyst</option>
                                            <option>Consultant</option>
                                            <option>Senior Consultant</option>
                                            <option>Manager</option>
                                            <option>Senior Manager</option>
                                            <option>Others</option>
                                            
                                    </select>
                                    {error&&designation.length<=0?
                                    <lable className='text-warning'>Designation can't be empty</lable>:""}
                                </div>

                                <div className = "form-group mb-2 col-md-3 offset-md-4" style={{marginTop:'-9%'}}>
                                    <label className = "form-label"> Base location </label>
                                    <select
                                        className = "form-control"
                                        value = {base_location}
                                        onChange = {(e) => setBase_location(e.target.value)}>
                                             <option selected disabled value="">Click here to select</option>
                                            <option>Mumbai</option>
                                            <option>Banglore</option>
                                            <option>Pune</option>
                                            <option>Hyderabad</option>
                                            <option>Chennai</option>
                                            <option>Delhi</option>
                                            <option>Kolkata</option>
                                            <option>Noida</option>
                                            <option>Others</option>
                                    </select>
                                    {error&&base_location.length<=0?
                                    <lable className='text-warning'>Base location can't be empty</lable>:""}
                                </div>

                                <div className = "form-group mb-2 col-md-3 offset-md-8" style={{marginTop:'-9%'}}>
                                    <label className = "form-label"> Company name </label>
                                    <select
                                        className = "form-control"
                                        value = {company_name}
                                        onChange = {(e) => setCompany_name(e.target.value)}>
                                            <option selected disabled value="">Click here to select</option>
                                            <option>Capgemini</option>
                                            <option>GE-Corp</option>
                                            <option>HP</option>
                                            <option>Google</option>
                                            <option>Amazone</option>
                                            <option>Microsoft</option>
                                            <option>TCS</option>
                                            <option>Infosys</option>
                                            <option>Wipro</option>
                                            <option>Accenture</option>
                                            <option>HP</option>
                                            <option>Google</option>
                                            <option>Amazone</option>
                                            <option>Microsoft</option>
                                            <option>Others</option>
                                    </select>
                                    {error&&company_name.length<=0?
                                    <lable className='text-warning'>Company name can't be empty</lable>:""}
                                </div>

                                <div className = "form-group mb-2 col-md-3" style={{marginTop:'4%'}}>
                                    <label className = "form-label"> Manager name </label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter manager name"
                                        name = "manager_name"
                                        className = "form-control"
                                        value = {manager_name}
                                        onChange = {(e) => setManager_name(e.target.value)}
                                    >
                                    </input>
                                    {error&&manager_name.length<=0?
                                    <lable className='text-warning'>Manager name can't be empty</lable>:""}
                                </div>

                                <div className = "form-group mb-2 col-md-3 offset-md-4" style={{marginTop:'-9%'}}>
                                    <label className = "form-label"> Start date </label>
                                    <input
                                        type = "date"
                                        placeholder = "dd-MMM-yyyy"
                                        name = "startDate"
                                        className = "form-control"
                                        value = {startDate}
                                        onChange = {(e) => setStartDate(e.target.value)}
                                    >
                                    </input>
                                    {error&&startDate.length<=0?
                                    <lable className='text-warning'>Start date can't be empty</lable>:""}
                                </div>

                                <div className = "form-group mb-2 col-md-3 offset-md-8" style={{marginTop:'-9%'}}>
                                    <label className = "form-label"> End date </label>
                                    <input
                                        type = "date"
                                        placeholder = "dd-MMM-yyyy"
                                        name = "endDate"
                                        className = "form-control"
                                        value = {endDate}
                                        onChange = {(e) => setEndDate(e.target.value)}
                                    >
                                    </input>
                                    {error&&endDate.length<=0?
                                    <lable className='text-warning'>End date can't be empty</lable>:""}
                                </div>

                               <button className = "btn shadow-lg btn-success mt-3 btn-outline-light" style = {{marginRight:"4px"}} onClick = {(e) => saveOrUpdateEmployee(e)} >SUBMIT </button>
                                <Link to="/employees" className="btn shadow-lg mt-3 btn-danger btn-outline-light"> CANCLE </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddEmployeeComponent;