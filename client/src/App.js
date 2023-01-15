import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [data, setData] = useState("");
  const [files, setFiles] = useState([]);

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
    <div className="App">
      <button onClick={getTextContent}>here</button>
      <button onClick={getAllFiles}>files</button>
      <p>{data}</p>
      <ul>{files.map((file,index) => <li key={index}>{file.name} {file.isFile ? 'is a file' : 'is a directory '}</li>)}</ul>
    </div>
  );
}

export default App;
