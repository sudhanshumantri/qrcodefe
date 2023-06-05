import React, { useRef, useState } from 'react';
import useFileUpload from 'react-use-file-upload';
import { Grid, Button, Card, CardContent, TextField, Box, FormHelperText } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import Loader from '../loader';
import icon from '../../asset/icon.png';
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
  const [qrResponceMsg, setQrResponceMsg] = useState('');
  const [radioValue, setRadioValue] = useState('csv');
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    status: "",

  });
  const [validations, setValidation] = useState({
    name: false,
    phone: false,
    status: false,
  });
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
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
    validations[name] && setValidation({ ...validations, [name]: false });
  };
  const handleValidation = () => {
    let errors = { ...validations };
    let isValid = true;
    if (!userData.name) {
      errors.name = true;
      isValid = false;
    }
    if (!userData.phone || userData.phone.length !== 10) {
      errors.phone = true;
      isValid = false;
    }
    if (!userData.status) {
      errors.status = true;
      isValid = false;
    }
    setValidation(errors);
    return isValid;
  };
  const handleQrSubmit = () => {
    if (handleValidation()) {
      setShowLoader(true);
      axios
        .post('https://qrcodebe.onrender.com/qr-code/generate-qr-code', userData)
        .then((response) => {
          setQrResponceMsg(response.data?.msg);
          //  setIsScanQrCode(false);
          setShowLoader(false);
        });
    }
  }
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  }
  return (
    <>
    {showLoader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "280px", height: "70px" }}>
            <Box
              component="img"
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              alt="Icon"
              src={icon}
            />
          </div>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radioValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="csv" control={<Radio />} label="Upload CSV" />
              <FormControlLabel value="form" control={<Radio />} label="Enter Data Using Forms" />
            </RadioGroup>
          </FormControl>
        </Grid>
        {(radioValue == "csv") && <Grid item xs={12}>
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
        </Grid>}
        {(radioValue == 'form') && <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box display="inline-block">
            <Card sx={{ maxWidth: "400px" }}>
              <CardContent>
                <Grid container spacing={2}>
                  {qrResponceMsg && <Grid item xs={12} sx={{ color: "red" }}>
                    {qrResponceMsg}
                  </Grid>}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      size="small"
                      type="text"
                      name="name"
                      placeholder='Enter Name'
                      onChange={handleChange}
                      value={userData.name}
                      error={validations.name}
                    />
                    {validations.name && (
                      <FormHelperText
                        sx={{ color: "red" }}
                      >
                        Please enter first name
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      size="small"
                      type="text"
                      name="phone"
                      placeholder='Enter Phone'
                      onChange={handleChange}
                      value={userData.phone}
                      error={validations.phone}
                    //helperText={validations.first_name?"Please enter first name":""}
                    />
                    {validations.phone && (
                      <FormHelperText
                        sx={{ color: "red" }}
                      >
                        Please enter correct phone
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      size="small"
                      type="text"
                      name="status"
                      placeholder='Enter status'
                      onChange={handleChange}
                      value={userData.status}
                      error={validations.status}
                    //helperText={validations.first_name?"Please enter first name":""}
                    />
                    {validations.status && (
                      <FormHelperText
                        sx={{ color: "red" }}
                      >
                        Please enter status
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleQrSubmit}>submit</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>}
      </Grid>


    </>
  )
}

export default UploadCsv