import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Grid, Button, Card, CardContent } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Loader from '../loader';

const ScanQrCode = (props) => {
    const [data, setData] = useState('');
    const [isScanQrCode, setIsScanQrCode] = useState(false);
    const [responce, setResponce] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const baseURL = 'https://qrcodebe.onrender.com/qr-code/scan';
    // const baseURL = 'http://localhost:8000/qr-code/scan';
    const handleScanCilck = () => {
        setIsScanQrCode(true);
        setResponce(null);
    }
    const handleScan = (result, error) => {
        if (result && isScanQrCode) {
            console.log('result',isScanQrCode);
            setIsScanQrCode(false);
            setData(result?.text);
            let phone = result?.text;
            if (phone) {
                setShowLoader(true);
                axios
                    .post(baseURL, {
                        phone: phone
                    })
                    .then((response) => {
                        setResponce(response.data);
                      //  setIsScanQrCode(false);
                        setShowLoader(false);
                    });
            }

        }

        if (!!error) {
            // console.info(error);
        }
    }
    return (
        <>
            {showLoader && <Loader />}
            <Grid container spacing={2}>
                {isScanQrCode &&
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <QrReader
                            onResult={handleScan}
                            scanDelay={300}
                          // facingMode={selected}
                            constraints={{
                                facingMode: 'environment'
                            }}
                            containerStyle={{ width: '500px', height: '500px' }}
                        />
                    </Grid>}
                {(responce && !responce.status) && <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", color: "red" }}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", color: "red" }}>
                                    <CloseIcon />
                                </Grid>
                                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", color: "red" }}>
                                    <p>Error :{responce.msg}</p>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>}
                {(responce && responce.status) && <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                {(responce && responce.status) && <>
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                        <DoneIcon />
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                        Name : {responce.data.name}
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                        Phone : {responce.data.phone}
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                                        Status : {responce.data.status}
                                    </Grid>
                                </>}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>}
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" onClick={handleScanCilck}>Scan QR Code</Button>
                </Grid>
            </Grid>
        </>
    );
};
export default ScanQrCode