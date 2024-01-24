/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

// GoogleProvider
const googleProvider = new GoogleAuthProvider();

export const registerUserWithEmailPassword = async ({ displayName, email, password }) => {

    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        // After creating the user, they are logged in, and we can update their profile.
        await updateProfile(firebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }

}

export const signInWithEmailPassword = async ({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage, errorCode
        }
    }
}

export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;

        return {
            ok: true,
            // User Info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);

        return {
            ok: false,
            errorMessage, errorCode
        }
    }
}

export const signOutApp = async () => {
    try {
        await signOut(firebaseAuth);

        return {
            ok: true,
            errorMessage: null
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)

        return {
            ok: false,
            errorMessage, errorCode
        }
    }
}