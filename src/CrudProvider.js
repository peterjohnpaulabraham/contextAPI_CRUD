import { createContext, useReducer } from "react"

const initialState = {
    "employees" :[
        {"name":"Peter","designation":"Team Lead","salary":50000}
    ]
}


const CrudContextReducer = (state,action) =>{
    switch(action.type){
        case "ADD_EMPLOYEE":
                            return{
                                ...state,
                                employees:[...state.employees,action.payload]
                            };
                            break;
        case "DELETE_EMPLOYEE":
                            // return{
                            //     ...state,
                            //     employees : state.employees.filter((item)=>{
                            //         return (item.name!==action.payload);
                            //     })
                            // }

                             //const empList = state.employees.filter(item=>item.name!==action.payload)
                             const employees = state.employees.filter(item=>item.name!==action.payload)
                             return {
                                ...state,
                                // employees : empList
                                employees
                             }

                                break;

        case "EDIT_EMPLOYEE":
                                const updatedItem = action.payload;
                                const updateEmpList = state.employees.map(item=>{
                                    if(item.name===updatedItem.name){
                                        item = updatedItem;
                                    }
                                    return item
                                })

                                return{
                                    ...state,
                                    employees:updateEmpList
                                }

                                break;

        default:
                 return state;
    }
}


export const CrudContext = createContext(initialState);

export const CrudContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(CrudContextReducer,initialState);

    return(
        <CrudContext.Provider value={{state,dispatch}}>
            {children}
        </CrudContext.Provider>
    )
}

