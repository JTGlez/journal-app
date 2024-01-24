/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Grid from "@mui/material/Grid"
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Google from "@mui/icons-material/Google"
import Link from "@mui/material/Link"
import { AuthLayout } from "../layout/AuthLayout";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useForm } from "../../hooks"

// We declare the initialForm outside the component to avoid an infinite loop on the useEffect that regenerates the form 
const initialForm = {
    email: '',
    password: ''
}

export const LoginPage = () => {

    const [formSubmited, setFormSubmited] = useState(false);
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);

    // Memorizes the status value to avoid recalculations
    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const formRules = {
        email: [(value) => value.includes('@'), 'Email should have an @'],
        password: [(value) => value.length >= 6, 'Password must have min 6 characters']
    }

    const { email, password, formState, isFormValid, emailValid, passwordValid, onInputChange } = useForm(initialForm, formRules);

    // Auth with email and password
    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmited(true);

        // Don't send to the backend!
        if (!isFormValid) return;

        // Send user and password to login with Firebase
        dispatch(startLoginWithEmailPassword(formState));
    }

    // Auth with Google Account
    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <>
            <AuthLayout title="JournalApp - Login" icon={SwitchAccountIcon}>

                <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster"
                >
                    <Grid container>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                label='Email'
                                type="email"
                                placeholder="correo@google.com"
                                fullWidth
                                name="email"
                                onChange={onInputChange}
                                value={email}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                label='Password'
                                type="password"
                                placeholder="password"
                                fullWidth
                                name="password"
                                onChange={onInputChange}
                                value={password}
                            />
                        </Grid>

                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                            <Grid
                                item
                                xs={12}
                                display={!!errorMessage ? '' : 'none'}
                            >
                                <Alert severity="error" >{errorMessage}</Alert>
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    disabled={isAuthenticating || !isFormValid}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={onGoogleSignIn}
                                    disabled={isAuthenticating}
                                >
                                    <Google />
                                    <Typography sx={{ ml: 1 }}>
                                        Google
                                    </Typography>
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Link component={RouterLink} color='inherit' to='/auth/register'>
                                Create an account
                            </Link>
                        </Grid>

                    </Grid>
                </form>
            </AuthLayout>
        </>
    )
}