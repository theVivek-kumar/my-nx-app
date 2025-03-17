import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import App from './app/app';
import { EmployeeProvider } from './app/EmployeeContext';
import { DataProvider } from './app/DataContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <DataProvider>
  <EmployeeProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </EmployeeProvider>
  </DataProvider>
);
