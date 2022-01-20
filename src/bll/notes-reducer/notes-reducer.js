import {notesAPI} from "../../api/fail-api";
import {setAppError} from "../app-reducer/app-reducer";

const GET_NOTES = 'NOTES/GET-NOTES'
const UPDATE_BODY_NOTE = 'NOTES/UPDATE-BODY-NOTE'
const ADD_NOTE = 'NOTES/ADD-NOTE'
const DELETE_NOTE = 'NOTES/DELETE-NOTE'

const initialState = {
    notes: [],
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: [...action.notes]
            }
        case ADD_NOTE:

            return {
                ...state,
                notes: [...state.notes, action.note]
            }
        case UPDATE_BODY_NOTE:
            const updateNote = state.notes.map(note => note.id === action.payload.id
                ? Object.assign(note, action.payload.data)
                : note)
            return {
                ...state,
                notes: updateNote
            }
        case DELETE_NOTE:
            const newSt = state.notes.filter(n => n.id !== action.id)
            return {
                ...state,
                notes: [...newSt]
            }

        default:
            return state
    }


}

export const action = {
    getNotes: (notes) => {
        return {type: GET_NOTES, notes}
    },
    addNote: (note) => {
        return {type: ADD_NOTE, note}
    },
    updateNote: (id, data) => {

        const payload = {id, data}
        return {type: UPDATE_BODY_NOTE, payload}
    },
    deleteNote: (id) => {
        return {type: DELETE_NOTE, id}
    }
}

export const getNotes = () => async (dispatch) => {
    try {

        const data = await notesAPI.getNotes()
        dispatch(action.getNotes(data))
    } catch (e) {
        if (e.message) {
            dispatch(setAppError(e.message))
        }
    }
}
