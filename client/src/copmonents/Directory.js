import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import File from './File';

function Directory(props) {
    const { user } = useContext(AppContext);
    const [dirFiles, setDirFiles] = useState([]);
    const [showFilesDir, setShowFilesDir] = useState(false);

    useEffect(() => {
        getFiles();
    }, [])

    const getFiles = async () => {
        const res = await fetch(`http://localhost:8000/api/${user.username}/files`)
        const data = await res.json();
        setDirFiles(data);
    }

    const showFiles = async (name) => {
        if (showFilesDir) {
            setShowFilesDir(!showFilesDir);
        } else {
            const res = await fetch(`http://localhost:8000/api/${user.username}/${name}/get`)
            const data = await res.json();
            setDirFiles(data)
            setShowFilesDir(!showFilesDir);
        }
    }

    


    return (
        <div>
            <h1>{props.data.name}</h1>
            {
                props.data.isFile ?
                    null :
                    <>
                        <button onClick={() => showFiles(props.data.name)}>Show files</button>
                        <button onClick={() => props.renameDir(props.data.name)}>Rename directory</button>
                    </>

            }
            {
                showFilesDir ? dirFiles.map((file, index) => <li key={index}>{file.name}</li>) : null
            }
        </div>
    )
}

export default Directory
