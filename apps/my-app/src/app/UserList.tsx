import React, { useContext, useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import {toast} from 'react-toastify';
const EmployeeList: React.FC = () => {
  const employeeContext = useContext(EmployeeContext);

  if (!employeeContext) {
    return <p>Loading...</p>;
  }

  const { employees, addEmployee, updateEmployee, deleteEmployee } = employeeContext;

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Validate Email Format
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.email}{" "}
            <button onClick={() => deleteEmployee(emp.id)}><span>🗑️</span> Delete</button>
            <button
              onClick={() => {
                const updatedName = prompt("Enter updated name:", emp.name);
                const updatedEmail = prompt("Enter updated email:", emp.email);
                if (updatedName && updatedEmail && validateEmail(updatedEmail)) {
                  updateEmployee(emp.id, updatedName, updatedEmail);
                } else {
                 alert("Invalid Email Format!");
                }
              }}
            >
              <span>✏️</span> Edit
            </button>
          </li>
        ))}
      </ul>

      <h3>Add New Employee</h3>
      <input type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
      <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <button
        onClick={() => {
          if (!validateEmail(newEmail)) {
            alert("Invalid Email Format!");
            return;
          }
          addEmployee(newName, newEmail);
          setNewName("");
          setNewEmail("");
        }}
      >
        <span>🆕</span> Add Employee
      </button>
    </div>
  );
};

export default EmployeeList;
