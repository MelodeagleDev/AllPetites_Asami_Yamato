import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DetailNavBar() {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Link to='/'>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            sx={{ mr: 2, color: '#4a4a4a' }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Link>
                    <Typography color={'#4a4a4a'} variant="h5" component="div">
                        Movie Details
                    </Typography>
                    <Link to='/'>
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="open drawer"
                            sx={{ mr: 2, color: '#4a4a4a' }}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>

        </>
    )
}