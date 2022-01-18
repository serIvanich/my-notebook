import {failState} from "../fail-state";

const ADD_NOTE = 'NOTES/ADD-NOTE'

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
        default:
            return state
    }


}

export const action = {
    addNote: (note) => {
        return {type: ADD_NOTE, note}
    }
}
