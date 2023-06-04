import React, { useRef, useState } from 'react';
import useFileUpload from 'react-use-file-upload';
import { Grid, Button, Card, CardContent } from '@mui/material';
import axios from "axios";
import Loader from '../loader';
const UploadCsv = () => {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,

  } = useFileUpload();
  const inputRef = useRef();
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState('');
  const baseURL = 'https://qrcodebe.onrender.com/qr-code/uploadcsv';
 // const baseURL = 'http://localhost:8000/qr-code/uploadcsv';
  const handleSubmit = async () => {
    // const formData = createFormData();
    setShowLoader(true)
    const formData = new FormData()
    files.forEach(file => {
      formData.append('uploadcsv', file);
    })
    try {
      axios.post(baseURL, formData, {
        'content-type': 'multipart/form-data',
      }).then((response) => {
        setMessage('CSV is uploaded sucessfully.')
        setShowLoader(false);
        clearAllFiles();
      })
        ;
    } catch (error) {
      console.error('Failed to submit files.');
    }
  };

  return (
    <>
      {showLoader && <Loader />}
      <p>{message}</p>
      <div className="file-conatiner">
        {fileNames.map((name, index) => (
          <p>{name}</p>
        ))}
        {/* {files && files.length == 0 && ( */}
        <Button onClick={() => inputRef.current.click()} variant="contained" >Select file</Button>
        {/* )} */}
        <input
          ref={inputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => {
            setMessage('')
            setFiles(e, 'w');
            inputRef.current.value = null;
            // handleSubmit()
          }}
        />
      </div>
      {files && files.length > 0 && (
        <Button onClick={handleSubmit} variant="contained" >Upload</Button>
      )}
    </>
  )
}

export default UploadCsv