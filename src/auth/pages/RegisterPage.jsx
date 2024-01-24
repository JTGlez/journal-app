/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import Alert from "@mui/material/Alert"
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import AutoStories from "@mui/icons-material/AutoStories"
import { useForm } from "../../hooks"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"

const formRules = {
    displayName: [(value) => value.length >= 1, 'Name is required'],
    email: [(value) => value.includes('@'), 'Email should have an @'],
    password: [(value) => value.length >= 6, 'Password must have min 6 characters']
}

const initialForm = {
    displayName: '',
    email: '',
    password: ''
}

export const RegisterPage = () => {

    const [formSubmited, setFormSubmited] = useState(false);
    const dispatch = useDispatch();
    const { displayName, email, password, formState, isFormValid, displayNameValid, emailValid, passwordValid, onInputChange } = useForm(initialForm, formRules);
    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmited(true);

        // Don't send to the backend!
        if (!isFormValid) return;

        // Login to Firebase
        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (
        <>
            <AuthLayout title="JournalApp - Register" icon={AutoStories}>

                <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster"
                >
                    <Grid container>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                label='Full Name'
                                type="text"
                                placeholder="Yorch"
                                fullWidth
                                name="displayName"
                                value={displayName}
                                onChange={onInputChange}
                                error={!!displayNameValid && formSubmited}
                                helperText={displayNameValid}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                label='Email'
                                type="email"
                                placeholder="yorch@gmail.com"
                                fullWidth
                                name="email"
                                value={email}
                                onChange={onInputChange}
                                error={!!emailValid && formSubmited}
                                helperText={emailValid}
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <TextField
                                label='Password'
                                type="password"
                                placeholder="password"
                                fullWidth
                                name="password"
                                value={password}
                                onChange={onInputChange}
                                error={!!passwordValid && formSubmited}
                                helperText={passwordValid}
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

                            <Grid item xs={12} >
                                <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    disabled={isCheckingAuthentication}
                                >
                                    Create Account
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid container direction='row' justifyContent='end'>
                            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
                            <Link component={RouterLink} color='inherit' to='/auth/login'>
                                Enter
                            </Link>
                        </Grid>

                    </Grid>
                </form>
            </AuthLayout>
        </>
    )
}