import {getNotesApi} from "../../api/fail-api";

const GET_NOTE = 'NOTES/GET-NOTE'
const ADD_NOTE = 'NOTES/ADD-NOTE'
const DELETE_NOTE = 'NOTES/DELETE-NOTE'

const initialState = {
    notes: [],
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_NOTE:
            return {
                ...state,
                notes:[...action.notes]
            }
        case ADD_NOTE:

            return {
                ...state,
                notes: [...state.notes, action.note]
            }
        case DELETE_NOTE:
const newSt = state.notes.filter(n => n.id !== action.id)
            const nState ={
                ...state,
                notes: [...newSt]
            }
            return nState
        default:
            return state
    }


}

export const action = {
    getNotes: (notes) => {
        return {type: GET_NOTE, notes}
    },
    addNote: (note) => {
        return {type: ADD_NOTE, note}
    },
    deleteNote: (id) => {
        return {type: DELETE_NOTE, id}
    }
}

export const getNotes = () => async(dispatch) => {
    try{

        const data = await getNotesApi()
        dispatch(action.getNotes(data))

    }
    catch (e) {
        console.log(e)
    }


}
