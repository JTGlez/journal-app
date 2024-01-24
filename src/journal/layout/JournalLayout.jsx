/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/SideBar/SideBar";
import { Toolbar } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {

    // Define breakpoints to know the viewport size and coordinate the sidebar
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [mobileOpen, setMobileOpen] = useState(isDesktop);

    // To open and close the navbar on toggle
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // When the viewport changes, close the drawer if we're moving to mobile view
    useEffect(() => {
        if (!isDesktop) {
            setMobileOpen(false);
        }
    }, [isDesktop]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }} className="animate__animated animate__fadeIn animate__faster"
        >
            {/* Navbar */}
            <Navbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            {/* Sidebar */}
            <Sidebar
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                isDesktop={isDesktop}
            />

            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 2,
                    [theme.breakpoints.up('sm')]: {
                        ml: `${drawerWidth}px`,
                    },
                }}

            >

                {/* Toolbar */}
                <Toolbar />
                {children}

            </Box>

        </Box>
    )
}
