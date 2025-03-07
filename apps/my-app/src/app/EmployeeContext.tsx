import React, { createContext, useState, useEffect, ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';

interface Employee {
  id: number;
  name: string;
  email: string;
}

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (name: string, email: string) => void;
  updateEmployee: (id: number, name: string, email: string) => void;
  deleteEmployee: (id: number) => void;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedEmployees = sessionStorage.getItem("employees");

      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      } else {
        fetch("https://jsonplaceholder.typicode.com/usersJ")
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            const formattedData = data.map((user: any) => ({
              id: user.id,
              name: user.name,
              email: user.email,
            }));

            setEmployees(formattedData);
            sessionStorage.setItem("employees", JSON.stringify(formattedData));
          })
          .catch((err) => {
            setError(`Failed to fetch employees: ${err.message}`);
            console.error("Error fetching employees:", err);
          });
      }
    } catch (err: any) {
      setError(`Error loading employees: ${err.message}`);
      console.error("Error loading employees:", err);
    }
  }, []);

  const updateSessionStorage = (updatedEmployees: Employee[]) => {
    try {
      sessionStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
    } catch (err: any) {
      setError(`Error updating sessionStorage: ${err.message}`);
      console.error("SessionStorage error:", err);
    }
  };

  // Add Employee with Toast Notification
  const addEmployee = (name: string, email: string) => {
    try {
      if (!name || !email) throw new Error("Name and Email are required!");

      const newEmployee: Employee = {
        id: employees.length ? Math.max(...employees.map(emp => emp.id)) + 1 : 1,
        name,
        email,
      };

      const updatedEmployees = [...employees, newEmployee];
      updateSessionStorage(updatedEmployees);

      toast.success("Employee added successfully!");
    } catch (err: any) {
      setError(`Error adding employee: ${err.message}`);
      console.error("Error adding employee:", err);
    }
  };

  // Update Employee with Toast Notification
  const updateEmployee = (id: number, name: string, email: string) => {
    try {
      const updatedEmployees = employees.map((emp) =>
        emp.id === id ? { ...emp, name, email } : emp
      );

      updateSessionStorage(updatedEmployees);
      toast.success("Employee updated successfully!");
    } catch (err: any) {
      setError(`Error updating employee: ${err.message}`);
      console.error("Error updating employee:", err);
    }
  };

  // Delete Employee with Toast Notification
  const deleteEmployee = (id: number) => {
    try {
      const updatedEmployees = employees.filter((emp) => emp.id !== id);
      updateSessionStorage(updatedEmployees);
      toast.success("Employee deleted successfully!");
    } catch (err: any) {
      setError(`Error deleting employee: ${err.message}`);
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
    {error && <p style={{ color: "red" }}>{error}</p>}
    {children}
  </EmployeeContext.Provider>
  );
};
