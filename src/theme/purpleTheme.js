/* eslint-disable no-unused-vars */
import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    pallete: {
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#543844'
        },
        error: {
            main: red.A200
        }
    }
});