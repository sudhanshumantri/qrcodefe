import React, { useRef } from 'react';
import useFileUpload from 'react-use-file-upload';
import { Grid, Button, Card, CardContent } from '@mui/material';
import axios from "axios";
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
  const baseURL = 'http://localhost:8000/qr-code/uploadcsv';
  const handleSubmit = async () => {
    // const formData = createFormData();
    console.log('files', files);
    const formData = new FormData()
      files.forEach(file => {
        formData.append('uploadcsv', file);
      })
    try {
      axios.post(baseURL, formData, {
        'content-type': 'multipart/form-data',
      });
    } catch (error) {
      console.error('Failed to submit files.');
    }
  };

  return (
    <>
      <Button onClick={() => inputRef.current.click()} variant="contained" >Select file</Button>
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          setFiles(e, 'a');
          inputRef.current.value = null;
          // handleSubmit()
        }}
      />
      <Button onClick={handleSubmit} variant="contained" >Upload</Button>

    </>
  )
}

export default UploadCsv