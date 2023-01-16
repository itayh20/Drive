import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';
import File from './File';

function Home() {
    const [files, setFiles] = useState([]);
    const { user } = useContext(AppContext);

    useEffect(() => {
        getFiles();
    }, [])

    const getFiles = async () => {
        const res = await fetch(`http://localhost:8000/api/${user.username}/files`)
        const data = await res.json();
        setFiles(data)
    }

    const addDir = async () => {
        const folderName = prompt('Name of directory');
        await fetch(`http://localhost:8000/api/${user.username}/files/${folderName}`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return (
        <div>
            <h1>Home</h1>
            <p>Hi {user.username}! it's from the pizza</p>
            {/* <ul>{files.map((file, index) => <li key={index}>{file.name} {file.isFile ? 'is a file' : 'is a directory '}</li>)}</ul> */}
            <ul>{files.map((file, index) => <File key={index} data={file} />)}</ul>
            <button onClick={addDir}>Add directory</button>
        </div>
    )
}

export default Home
