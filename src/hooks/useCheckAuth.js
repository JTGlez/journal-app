/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkingCredentials, login, logout } from "../store/auth";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/journal";

export const useCheckAuth = () => {

    // Verification starts by default in false, as we are about to start checking
    const [verificationDone, setVerificationDone] = useState(false);
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // Checks the current user from Firebase every time the app is loaded
    useEffect(() => {

        // Subscription to the user status: observable with returning values
        onAuthStateChanged(firebaseAuth, async (user) => {

            dispatch(checkingCredentials());
            // If no user is active, then cleans the auth state
            if (!user) {
                setVerificationDone(true);
                return dispatch(logout({}))
            }

            // If we have an user, call the login action
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));

            // Then, start loading notes
            dispatch(startLoadingNotes());

            // After checking, we can go to the router
            setVerificationDone(true);
        });

    }, []);

    return {
        verificationDone,
        status
    }
}
