/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView, NoteView } from "../views"
import { IconButton } from "@mui/material"
import AddOutlined from "@mui/icons-material/AddOutlined"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.journal);

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <>
            <JournalLayout>

                {
                    !!active
                        ? <NoteView />
                        : <NothingSelectedView />
                }

                <IconButton
                    onClick={onClickNewNote}
                    disabled={isSaving}
                    size="large"
                    sx={{
                        color: 'white',
                        backgroundColor: '#105595',
                        ':hover': { backgroundColor: '#105595', opacity: '0.9' },
                        position: 'fixed',
                        right: 50,
                        bottom: 50
                    }}
                >

                    <AddOutlined sx={{ fontSize: 30 }} />

                </IconButton>

            </JournalLayout>
        </>
    )
}