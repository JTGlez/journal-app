/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { Grid, Typography, Button, TextField, useMediaQuery, IconButton } from "@mui/material"
import SaveOutlined from "@mui/icons-material/SaveOutlined"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm, useFormatDate } from "../../hooks";
import { useEffect, useRef } from "react";
import { setActiveNote, startDeleteNote, startSaveNote } from "../../store/journal";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css'
import { useTheme } from "@emotion/react";
import { startUploadImages } from "../../store/journal";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import DeleteOutline from "@mui/icons-material/DeleteOutline";

/* To change the active note, we need to update our useForm to force it to regenerate the form when the active note changes  */

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const { date, imageUrls } = note;
    const { formattedDate } = useFormatDate(date);
    const { formState, title, body, onInputChange } = useForm(note);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const fileInputRef = useRef(); // Reference the hidden file input to activate it using the onClick on the IconButton

    // Updates the active note every time the input changes
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        // Uses media query to adapt placement on sm breakpoint and higher
        if (messageSaved.length > 0) {
            Swal.fire({
                title: 'Note Updated!',
                text: messageSaved,
                icon: 'success',
                position: 'center',
                customClass: {
                    container: isDesktop ? 'swal-wide' : '',
                }
            });
        }

    }, [messageSaved]);

    const onSavingNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadImages(target.files));
    }

    const onDelete = () => {
        dispatch(startDeleteNote());
    }

    return (
        <>
            <Grid
                container
                className="animate__animated animate__fadeIn animate__faster"
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 1 }}
            >

                <Grid item>
                    <Typography fontSize={39} fontWeight='light'>{formattedDate}</Typography>
                </Grid>

                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                />

                <div className="flex-container">
                    <IconButton
                        color="primary"
                        disabled={isSaving}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <UploadOutlined />
                    </IconButton>

                    <Grid item>
                        <Button
                            color="primary"
                            sx={{ padding: 2 }}
                            onClick={onSavingNote}
                            disabled={isSaving}
                        >
                            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                            Save
                        </Button>
                    </Grid>
                </div>

                <Grid container>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        placeholder="Enter a title"
                        label='Title'
                        sx={{ border: 'none', mb: 1 }}
                        name="title"
                        value={title}
                        onChange={onInputChange}
                    />

                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="What happened today?"
                        minRows={5}
                        sx={{ border: 'none', mb: 1 }}
                        name="body"
                        value={body}
                        onChange={onInputChange}
                    />

                </Grid>

                <Grid container justifyContent='end'>
                    <Button
                        onClick={onDelete}
                        sx={{ mt: 2 }}
                        color="error"
                    >
                        <DeleteOutline />
                        Delete
                    </Button>
                </Grid>

                {/* Image Gallery */}

                <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImageGallery images={imageUrls} />
                </Grid>

            </Grid>
        </>
    )
}
