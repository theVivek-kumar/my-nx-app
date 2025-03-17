import React, { createContext, useState, useEffect, ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
  resetEmployees: () => void;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data.length) {
          throw new Error("No employee data received from API");
        }
        // Correctly map the API response to the Employee interface
        const formattedData = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));

        setEmployees(formattedData);
        sessionStorage.setItem("employees", JSON.stringify(formattedData));
        setError(null);
      })
      .catch((err) => {
        setError(`Failed to fetch employees: ${err.message}`);
        console.error("Error fetching employees:", err);
      });
  };

  useEffect(() => {
    const storedEmployees = sessionStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    } else {
      fetchEmployees();
    }
  }, []);

  const updateSessionStorage = (updatedEmployees: Employee[]) => {
    sessionStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
  };

  const addEmployee = (name: string, email: string) => {
    if (!name || !email) {
      setError("Name and Email are required!");
      return;
    }
    const newEmployee: Employee = {
      id: employees.length ? Math.max(...employees.map(emp => emp.id)) + 1 : 1,
      name,
      email,
    };
    updateSessionStorage([...employees, newEmployee]);
    toast.success("Employee added successfully!");
  };

  const updateEmployee = (id: number, name: string, email: string) => {
    updateSessionStorage(
      employees.map(emp => (emp.id === id ? { ...emp, name, email } : emp))
    );
    toast.success("Employee updated successfully!");
  };

  const deleteEmployee = (id: number) => {
    updateSessionStorage(employees.filter(emp => emp.id !== id));
    toast.success("Employee deleted successfully!");
  };

  const resetEmployees = () => {
    sessionStorage.removeItem("employees");
    fetchEmployees();
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, resetEmployees }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {children}
    </EmployeeContext.Provider>
  );
};