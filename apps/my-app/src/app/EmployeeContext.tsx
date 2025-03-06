import React, { createContext, useState, useEffect, ReactNode } from "react";

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
  

  // Load data from API data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));
        setEmployees(formattedData);
        localStorage.setItem("employees", JSON.stringify(formattedData));
    });
        
  }, []);

  // Add Employee
  const addEmployee = (name: string, email: string) => {
    if (!name || !email) return alert("Name and Email are required!");

    const newEmployee: Employee = {
      id: employees.length + 1,
      name,
      email,
    };

    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  // Update Employee
  const updateEmployee = (id: number, name: string, email: string) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === id ? { ...emp, name, email } : emp
    );

    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  // Delete Employee
  const deleteEmployee = (id: number) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
