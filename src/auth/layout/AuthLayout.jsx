/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

export const AuthLayout = ({ children, title = '', icon: Icon }) => {

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
            >

                <Grid
                    item
                    className="box-shadow"
                    xs={3}
                    sx={{
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 2,
                        width: { md: 450 }
                    }}
                >

                    <Grid
                        container
                        justifyItems='center'
                        gap={1}
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Typography variant="h5" sx={{ mb: '1' }}>{title}</Typography>
                        {Icon && <Icon />}

                    </Grid>

                    {children}

                </Grid>

            </Grid>

        </>
    )
}
