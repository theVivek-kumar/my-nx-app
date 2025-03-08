import React from "react";
//import { LibOne } from "@my-nx-app/lib-one";
//import MyButton from "./button";
//import useLocalStorage from "./useLocalStorage";
//import UserList from "./UserList";
import EmployeeList from "./UserList";
import { EmployeeProvider } from "./EmployeeContext";
import {ToastContainer} from 'react-toastify';

export function App() {
  // Using custom hook to store counter in localStorage
  //const [count, setCount, clearCount] = useLocalStorage<number>("counter", 0);

  return (
    <div>
     
      <EmployeeProvider>
      <div>
        <ToastContainer aria-label = 'Notification contaner' position="top-right" autoClose={3000} />
        <h1>Employee Management System</h1>
        <EmployeeList />
      </div>
    </EmployeeProvider>
    </div>
    
  );
}

export default App;
