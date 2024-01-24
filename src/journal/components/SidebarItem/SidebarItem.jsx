/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material";
import TurnedInNot from "@mui/icons-material/TurnedInNot";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../../store/journal/journalSlice";

export const SidebarItem = ({ title, body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title]);

    const newBody = useMemo(() => {
        return body.length > 17
            ? body.substring(0, 17) + '...'
            : body
    }, [body]);

    const activeNote = useMemo(() => {
        return {
            id,
            title,
            body,
            date,
            imageUrls
        }
    }, [body, date, id, title, imageUrls]);

    const onNewActiveNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageUrls}));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onNewActiveNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container flexDirection='column'>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={newBody} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
