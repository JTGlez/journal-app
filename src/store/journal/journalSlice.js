/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
        /*
        active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 123456,
            imageUrls: [], https://foto1.jpg, https://foto.jpg
        } */
    },
    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload); // Add the new note 
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload; // Set the current note
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload; // Set the notes from Firebase
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;

            // Mutant code is allowed! So we can use a for to find the notes to update
            for (let index = 0; index < state.notes.length; index++) {
                if (state.notes[index].id === action.payload.id) {
                    state.notes[index] = action.payload;
                }
            }

            state.messageSaved = `${action.payload.title} updated successfully!`;

        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload] // Append the new Urls with the old ones, if they exist
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            // Filter and delete from the array the given note by id
            state.notes = state.notes.filter((note) => note.id !== action.payload);
            state.active = null;
            state.messageSaved = 'Note deleted successfully!'
        }

    }
});

// Action creators
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById } = journalSlice.actions;