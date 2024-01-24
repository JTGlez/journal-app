/* eslint-disable no-unused-vars */
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes, fileUpload } from "../../helpers";

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;
        console.log('startnewnote')

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        try {
            const docRef = await addDoc(
                collection(firebaseDB, `${uid}/journal/notes`), newNote);

            console.log(docRef);
            newNote.id = docRef.id;

            // Dispatch
            dispatch(addNewEmptyNote(newNote));
            dispatch(setActiveNote(newNote));

        } catch (error) {
            console.log(error);
        }

    }

}

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('Missing UID');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));

    }

}

export const startSaveNote = () => {

    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const note = getState().journal.active

        // Delete the id inside the note
        const noteToFirestore = { ...note };
        delete noteToFirestore.id; // To delete properties

        try {
            const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
            await updateDoc(docRef, noteToFirestore);
            // updateDoc() performs an automatic merge, preserving the document data
            // await updateDoc(docRef, { field1: 'new value', field2: 'another new value' });

        } catch (error) {
            console.log(error);

        }

        dispatch(updateNote(note));
    }

}

export const startUploadImages = (files = []) => {

    return async (dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);

        // For upload multiple images, use multiple promises to execute all of them at the same time
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls))

    }

}

export const startDeleteNote = () => {

    return async (dispatch, getState) => {

        // Retrieve the uid of the current user
        const { uid } = getState().auth;

        // Retrieve the uid of the active note
        const note = getState().journal.active

        try {
            const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
            await deleteDoc(docRef);

        } catch (error) {
            console.log(error);

        }

        // Delete from the local state
        dispatch(deleteNoteById(note.id));
    }
}