import {appAPI} from "../../api/fail-api";
import {getNotes} from "../notes-reducer/notes-reducer";

const SET_ERROR = 'APP/SET-ERROR'
export const SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED'

const initialState = {
    isInitialized: false,
    error: null,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}

        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppError = (error) => {
    return {type: SET_ERROR, error}
}
export const setInitialized = (isInitialized) => {
    return {type: SET_IS_INITIALIZED, isInitialized}
}

export const initializeApp = () => async (dispatch) => {

    try{
        const res = await appAPI.me()

        dispatch(setInitialized(res))
        dispatch(getNotes())
    }
    catch (e) {
        if(e.message) {
            dispatch(setAppError(e.message))
        }
    }

}
