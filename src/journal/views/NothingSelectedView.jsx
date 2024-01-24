/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material"
import StarOutline from "@mui/icons-material/StarOutline"
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'

export const NothingSelectedView = () => {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const { messageSaved } = useSelector(state => state.journal);


    useEffect(() => {
        // Uses media query to adapt placement on sm breakpoint and higher
        if (messageSaved.length > 0) {
            Swal.fire({
                title: 'Note Deleted!',
                text: messageSaved,
                icon: 'success',
                position: 'center',
                customClass: {
                    container: isDesktop ? 'swal-wide' : '',
                }
            });
        }

    }, [messageSaved]);

    return (
        <>
            <Grid
                container
                className="animate__animated animate__fadeIn animate__faster"
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: 'calc(100vh - 110px )', backgroundColor: 'primary.main', padding: 4, borderRadius: 2 }}
            >

                <Grid
                    item
                    className="box-shadow"
                    xs={3}
                    sx={{
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 2,
                        width: { md: 450 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <StarOutline sx={{ fontSize: 75 }} />
                    <Typography variant="h6"> Select or create an entry </Typography>


                </Grid>

            </Grid>
        </>
    )
}