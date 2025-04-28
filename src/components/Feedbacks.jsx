import {useState} from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

import axios from "axios";

import "../styles/uploadFolder.css";


function Feedbacks(){

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [server, setServer] = useState("");

    const [colorClass, setColorClass] = useState("bg-primary");

    function handleFileChange(e){

        if (e.target.files){
            setFile(e.target.files[0]);
            console.log("file input", e.target.files[0]);
        }
    }

    async function handleFileUpload(){
        if (!file) return;

        setStatus('uploading');
        // resetting the upload progress
        setUploadProgress(0);
        setColorClass("bg-primary");

        const formData = new FormData();
        formData.append('file', file);
        formData.append('server', server);

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try{
            await axios.post('http://localhost:4000/post', formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total 
                        ? Math.round(((progressEvent.loaded * 100) / progressEvent.total) - 1)
                        : 0;
                    setUploadProgress(progress);
                },
            });
            console.log("✅ Upload successful");
            setStatus('success');
            setUploadProgress(100);
            setColorClass("bg-success");

        }catch(error) {
            console.error("❌ Upload failed:", error);
            // incase of an error want to set it to 0
            setStatus('error');
            setUploadProgress(0);
            setColorClass("bg-danger");
        }
    }

    return (
        <>
            <div className="file_upload">
                Server File Uploader
            </div>

            <div className="space-y-2">
                <input type="file" onChange={handleFileChange}/>

                {file && (
                    <div>
                    <div className='file-info'>
                        <p>File name: {file.name}</p>
                        <p>Size: {(file.size / 1024).toFixed(2)} KB </p>
                        <p>Type: {file.type}</p>
                    </div>

                    <DropDown server={server} setServer={setServer} />
                    {/*<AddServer uploadedFileName={file.name}/>*/}

                    </div>
                )}

                    
                {status === 'uploading' && (
                    <div className="mb-3">
                        <div className="progress">
                            <div
                                className={`progress-bar progress-bar-striped progress-bar-animated ${colorClass}`}
                                role="progressbar"
                                style={{ width: `${uploadProgress}%`} }
                                aria-valuenow={uploadProgress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                            </div>
                        </div>
                        <p className="text-muted small mt-1">{uploadProgress}% uploading</p>
                    </div>
                )}

                {file && status !== 'uploading' && (
                    <Button onClick={handleFileUpload}>Upload</Button>
                )}

                {status === 'success' && (
                    <div className="pose-success">
                        <p className="success-message">File uploaded successfully!</p>
                    </div>
                )}

                {status === 'error' && (
                <p className="error-message">Upload failed. Please try again.</p>
                )}

            </div>
        </>
    )
}


function DropDown({ server, setServer }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleServerSelection(name) {
        setServer(name);
        setIsOpen(false); // close dropdown after selection
    }

    return (
        <div className='dropdown'>
            <button onClick={() => setIsOpen(!isOpen)}> 
                {server ? server : "Select Server"} 
            </button>

            <div className='content'>
                <a href="#" onClick={() => handleServerSelection("172.31.0.100")}> Bastion Host</a>
                {/*<a href="#" onClick={() => handleServerSelection("Pentagon Simulated Router")}> Pentagon Simulated Router </a> */}
            </div>
            
        </div>
    );
}

export default Feedbacks;