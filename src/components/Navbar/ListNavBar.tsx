import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "../Searchbar";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

export default function ListNavBar() {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <SearchBar />
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