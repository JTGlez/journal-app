import { collection, getDocs, query } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('Missing UID');

    // Retrieve notes from the user
    const notesQuery = await getDocs(query(collection(firebaseDB, `${uid}/journal/notes`)));

    // Format the data inside the query
    const notes = [];

    notesQuery.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() })
    })

    return notes;
}
