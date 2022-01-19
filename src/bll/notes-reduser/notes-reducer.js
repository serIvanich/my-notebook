import {failState} from "../fail-state";

const ADD_NOTE = 'NOTES/ADD-NOTE'
const DELETE_NOTE = 'NOTES/DELETE-NOTE'

const initialState = {
    notes: [...failState],
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_NOTE:

            return {
                ...state,
                notes: [...state.notes, action.note]
            }
        case DELETE_NOTE:

            return {
                ...state,
                notes: state.notes.filter(n => n.id !== action.id)
            }
        default:
            return state
    }


}

export const action = {
    addNote: (note) => {
        return {type: ADD_NOTE, note}
    },
    deleteNote: (id) => {
        return {type: DELETE_NOTE, id}
    }
}
