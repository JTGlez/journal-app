/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {

    const { status, verificationDone } = useCheckAuth();

    if (!verificationDone) {
        return <CheckingAuth />;
    }

    return (
        <Routes>

            {/* Login and Register: AuthRoutes is used for every route that starts with auth/ */}
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<JournalRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            {/* If not authenticated, every route will redirect to the login */}
            <Route path='/*' element={<Navigate to='/auth/*' />} />

        </Routes>
    )
}
