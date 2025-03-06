import React from "react";
import NxWelcome from "./nx-welcome";
import { LibOne } from "@my-nx-app/lib-one";
import MyButton from "./button";
import useLocalStorage from "./useLocalStorage";
import UserList from "./UserList";
import EmployeeList from "./UserList";
import { EmployeeProvider } from "./EmployeeContext";

export function App() {
  // Using custom hook to store counter in localStorage
  //const [count, setCount, clearCount] = useLocalStorage<number>("counter", 0);

  return (
    <div>
     
      <EmployeeProvider>
      <div>
        <h1>Employee Management System</h1>
        <EmployeeList />
      </div>
    </EmployeeProvider>
    </div>
    
  );
}

export default App;
