import { useContext, useState } from "react";
import {CrudContext} from "./CrudProvider";

function Dashbord(){

    const { state, dispatch } = useContext(CrudContext);
    console.log(state);

    const {employees} = state;

    const empInitialData =  {"name":"","designation":"","salary":""};
    const [empData,setEmpData] = useState(empInitialData);
    const [isEdit,setIsEdit] = useState(false);

    const onchangeEmpElements = (e) =>{
        const {name,value} = e.target;
        setEmpData({...empData,[name]:value});
    }

    const addEmpItem = () =>{
        var newItem = {...empData};
        dispatch({
            type:'ADD_EMPLOYEE',
            payload:newItem
        })
        clearEmpItem();
    }

    const clearEmpItem = () =>{
        setEmpData({...empInitialData})
    }

    const editEmpItem = (item,index) =>{
        setIsEdit(true);
        setEmpData({...item});
    }

    const updateEmpItem = () =>{
        var updatedItem = {...empData};
        dispatch({
            type:'EDIT_EMPLOYEE',
            payload:updatedItem
        })
        clearEmpItem();
    }

    const deleteEmpItem = (item) =>{
        const {name} = item;
        dispatch({
            type:"DELETE_EMPLOYEE",
            payload:name
        })
    }

    return (
        <div>
            <p>Dashboard page</p>
            <div>
                <p>
                    <label>Name</label>
                    <input type="text" name="name" value={empData.name} onChange={(e)=>onchangeEmpElements(e)}/> {empData.name}
                </p>
                <p>
                    <label>Designation</label>
                    <input type="text" name="designation" value={empData.designation} onChange={(e)=>onchangeEmpElements(e)}/>
                </p>
                <p>
                    <label>Salary</label>
                    <input type="text" name="salary" value={empData.salary} onChange={(e)=>onchangeEmpElements(e)}/>
                </p>
                <p>
                    {isEdit ? <button onClick={updateEmpItem}>Update</button> : <button onClick={addEmpItem}>Add</button> }
                    {/* <button onClick={addEmpItem}>Add</button> */}
                    <button onClick={clearEmpItem}>Clear</button>
                </p>
            </div>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Salary</th>
                </tr>
                {
                    (employees.length>0) && employees.map(function(item,index){
                        return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.designation}</td>
                                <td>{item.salary}</td>
                                <td><button onClick={(e)=>editEmpItem(item,index)}>Edit</button></td>
                                <td><button onClick={(e)=>deleteEmpItem(item)}>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Dashbord;

