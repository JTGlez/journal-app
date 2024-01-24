/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import Person from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../../store/auth';


export const Navbar = ({ drawerWidth = 240, handleDrawerToggle }) => {

    const { photoURL } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = useState(null);

    // For opening and closing the user menu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/* Hamburguer Icon to open and close Sidebar on mobile */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerToggle}
                            color="inherit"
                            sx={{ display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* App Branding and Icon */}
                    <AdbIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        JournalApp
                    </Typography>

                    {/* User Profile Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" referrerPolicy="no-referrer" src={(!!photoURL) ? photoURL : '/static/images/avatar/2.jpg'} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">Profile</Typography>
                                <Person sx={{ ml: 1.2 }} />
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">Logout</Typography>
                                <LogoutOutlined sx={{ ml: 1 }} />
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}