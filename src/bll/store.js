import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {notesReducer} from "./notes-reduser/notes-reducer";

const reducers = combineReducers({
    notes: notesReducer,
})

const store = createStore(
    reducers,undefined,
    applyMiddleware(thunk)
)

window.__store__ = store

export default store

