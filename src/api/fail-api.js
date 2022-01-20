import {notes} from "./response-notes";

export const notesAPI = {
    getNotes() {
        return Promise.resolve(notes)
    }


}

export const appAPI = {
    me () {
        return Promise.resolve(true)
    }
}
