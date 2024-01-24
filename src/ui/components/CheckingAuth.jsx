import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"


export const CheckingAuth = () => {
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
                    container
                    display={'flex'}
                    direction={'row'}
                    justifyContent='center'
                    sx={{
                        width: { md: 450 }
                    }}
                >
                    <CircularProgress color="warning" />

                </Grid>
            </Grid>

        </>
    )
}