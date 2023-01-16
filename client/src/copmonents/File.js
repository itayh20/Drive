import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';

function File(props) {
    const { user } = useContext(AppContext);
    const [dirFiles, setDirFiles] = useState([]);
    const [showFilesDir, setShowFilesDir] = useState(false);
    const [show, setShow] = useState(false);
    const [showSize, setShowSize] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [content, setContent] = useState("")
    
    const showIfFile = () => {
        setShow(!show);
    }

    const showfileSize = () => {
        setShowSize(!showSize);
    }
    
    const showContentfunc = async () => {
        setShowContent(!showContent);
        const res = await fetch(`http://localhost:8000/${user.username}/${props.data.name}`)
        const data = await res.text();
        setContent(data);

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
            <button onClick={() => showIfFile()}>is it a file?</button>
            <br />
            {show ? <span>{props.data.isFile ? 'it is a file' : 'it is a folder'}</span> : null}
            <br />
            <button onClick={() => showfileSize()} >how big is it?</button>
            <br />
            {showSize ? <span>{props.data.fileSize ? `file size is : ${props.data.fileSize} b.` : "the file is empty you shit"}</span> : null}
            <button onClick={() => showContentfunc()} >what's inside</button>
            {showContent ? <p>{content}</p> : null}
            <button onClick={() => props.deleteFile(props.data.name)}> Delete </button>
            <button onClick={() => props.renameFile(props.data.name)}> Rename </button>
            {
                props.data.isFile ?
                    null :
                    <button onClick={() => showFiles(props.data.name)}>Show files</button>
            }
            {
                showFilesDir ? dirFiles.map((file, index) => <li key={index}>{file.name}</li>) : null
            }
        </div>
    )
}

export default File;
