/* eslint-disable react/prop-types */
import { Box, Drawer, Toolbar, Typography, Divider, List } from "@mui/material";
import { useSelector } from "react-redux";
import { SidebarItem } from "../index";

export const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerToggle, isDesktop }) => {

    const { displayName } = useSelector(state => state.auth);
    const { notes } = useSelector(state => state.journal);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant={isDesktop ? 'permanent' : 'temporary'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: 'block', sm: '' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes?.map(note => (
                            <SidebarItem key={note.id} {...note} />
                        ))
                    }
                </List>

            </Drawer>
        </Box >
    )
}
