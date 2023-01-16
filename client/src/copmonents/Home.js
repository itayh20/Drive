import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';
import File from './File';
import Directory from './Directory';

function Home() {
    const [files, setFiles] = useState([]);
    const { user } = useContext(AppContext);

    useEffect(() => {
        getFiles();
    }, [])

    const getFiles = async () => {
        const res = await fetch(`http://localhost:8000/api/${user?.username}/files`)
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
        await getFiles();
    }

    const deleteFile = async (name) => {
        await fetch(`http://localhost:8000/${user.username}/${name}`, {
            method: 'DELETE',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        await getFiles()
    }

    const renameDir = async (oldName) => {
        let newName = prompt('give a new name');
        await fetch(`http://localhost:8000/api/${user.username}/${newName}/${oldName}`,{
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        });
        await getFiles();
    }

    const renameFile = async (oldName) => {
        const newName = prompt("שם חדש אבא")
        await fetch(`http://localhost:8000/${user.username}/${oldName}/${newName}`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        await getFiles()
    }

    return (
        <div>
            <h1>Home</h1>
            <p>Hi {user.username}! it's from the pizza</p>
            {/* <ul>{files.map((file, index) => <li key={index}>{file.name} {file.isFile ? 'is a file' : 'is a directory '}</li>)}</ul> */}
            <ul>{files.map((file, index) => file.isFile ? <File key={index} data={file} deleteFile={deleteFile} renameFile = {renameFile} /> : <Directory key={index} data={file} renameDir={renameDir} />)}</ul>
            <button onClick={addDir}>Add directory</button>
        </div>
    )
}

export default Home
