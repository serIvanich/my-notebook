import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {notesReducer} from "./notes-reducer/notes-reducer";
import {appReducer} from "./app-reducer/app-reducer";

const reducers = combineReducers({
    app: appReducer,
    notes: notesReducer,
})

const store = createStore(
    reducers, undefined,
    applyMiddleware(thunk)
)

window.__store__ = store

export default store


