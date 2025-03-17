import React from 'react';
import { DataProvider } from './DataContext';
//import ProductTable from './ProductTable';
import 'antd/dist/reset.css';
import Sidebar from './TaskOutLiner';



const App: React.FC = () => {
  return (
    <DataProvider>
      <div className="App">
        <h1>Product List </h1>
        <Sidebar/>
       
      </div>
    </DataProvider>
  );
};

export default App;