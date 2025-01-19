import React,{useState,useEffect} from "react";
import styles from "./Pagination.module.css"
const Pagination = ()=>{
    const [employeeData,setEmployeeData]=useState([]);
    const [currentPage,setCurrentPage] =useState(1);
    const [itemsPerPage,setItemsPerPage]=useState(10);
    const fetchEmployeeData = async ()=>{
        try{
            const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
            const jsonData = await response.json();
            setEmployeeData(jsonData);
        }catch(error){
            console.error("failed to fetch data");
        }
    }
    useEffect(()=>{
        fetchEmployeeData();
    },[])
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employeeData.slice(indexOfFirstItem, indexOfLastItem);
    const handleNext =()=>{
        if(currentPage < Math.ceil(employeeData.length/itemsPerPage)){
            setCurrentPage((prev)=>prev+1);
        }
    }
    const handlePrevious =()=>{
        if(currentPage>1){
            setCurrentPage((prev)=>prev-1);
        }
    }
    return(
        <div className={styles.container}>
            <h1>Employee Data Table</h1>
            <div className={styles.Table}>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((employee,index)=>(
                        <tr>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>     
                        ))}
                    </tbody>
                </table>

            </div>
            <div className={styles.tableBottom}>
                <button onClick={handlePrevious} disabled={currentPage === 1}>previous</button>
                <div className={styles.currentPage}><h5>{currentPage}</h5></div>
                <button onClick={handleNext} disabled={currentPage>=Math.ceil(employeeData.length/itemsPerPage)}>next</button>
            </div>
        </div>
    )
}

export default Pagination;