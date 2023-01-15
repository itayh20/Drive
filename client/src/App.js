import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import Login from './copmonents/Login';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import Home from './copmonents/Home';
import { createContext } from 'react';
import Register from './copmonents/Register';

export const AppContext = createContext();

function App() {
  const [data, setData] = useState("");
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);

  const getTextContent = async () => {
    try {
      console.log('mosh');
      const res = await fetch("http://localhost:8000/api");
      const data = await res.text();
      setData(data);

    } catch (error) {
      alert(error)
    }
  }

  const getAllFiles = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/files");
      const data = await res.json();
      console.log(data);
      setFiles(data);
    } catch (error) {
      alert(error)
    }
  }



  return (

    // {/* <button onClick={getTextContent}>here</button>
    // <button onClick={getAllFiles}>files</button>
    // <p>{data}</p>
    // <ul>{files.map((file,index) => <li key={index}>{file.name} {file.isFile ? 'is a file' : 'is a directory '}</li>)}</ul> */}
    // {/* <Login /> */}
    <AppContext.Provider value={{ user,setUser }}>
      <BrowserRouter>
        <Routes >
          <Route index element={<Navigate replace to="/login" />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/:username" element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<h1>error</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>



  );
}

export default App;
