import React from 'react';
import './style.css'
import { Backdrop, CircularProgress, Typography } from "@mui/material/";
export default function Loader({ title, }) {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress sx={{ color: '#517223',}} />
            {title && (
                <>
                    <br />
                    <Typography variant='p' className="loader-text">{title}</Typography>
                </>
            )}
        </Backdrop>
    );
}