/* eslint-disable no-unused-vars */
import { checkingCredentials, login, logout } from "./authSlice";
import { signInWithGoogle, registerUserWithEmailPassword, signInWithEmailPassword, signOutApp } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";

// Thunks: dispatch with async actions
// A Thunk is a function that returns another function, which receives the dispatch as an argument.
export const checkingAuthentication = (email, password) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startCreatingUserWithEmailPassword = ({ displayName, email, password }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ displayName, email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));

    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, displayName, photoURL, errorMessage } = await signInWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, displayName, email, photoURL }));

    }

}

export const startLogout = () => {

    return async (dispatch) => {
        const { ok, errorMessage } = await signOutApp();

        // Clean the journal
        dispatch(clearNotesLogout());

        dispatch(logout());

    }
}

export const startGoogleSignIn = () => {

    return async (dispatch) => {
        // Starts SignIn process
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        // If the login fails, then dispatch the logout action with the error message
        if (!result.ok) return dispatch(logout(result.errorMessage));

        // Instead, if result.ok is true, then login with the user data
        dispatch(login(result));

    }
}