import s from './App.module.css';
import {failState} from "../../bll/fail-state";
import {SummaryTable} from "../features/SummaryTable";
import {Modal} from "../common/Modal/Modal";
import {useEffect, useState} from "react";
import {NotesTable} from "../features/NotesTable";
import {useDispatch, useSelector} from "react-redux";
import {getNotes} from "../../bll/selectors";
import {action} from "../../bll/notes-reduser/notes-reducer";

function App() {
    const dispatch = useDispatch()
    const [isModal, setIsModal] = useState(false)
    const [currentNoteId, setCurrentNoteId] = useState(0)
    let modalData = []
    const notes = useSelector((state) => getNotes(state))

    useEffect(() => {

    })

    const closeModal = () => {
        setIsModal(false)
    }

    const openIsModal = (id) => {

        if (Number.isInteger(id)) {
            setCurrentNoteId(id)
        }
        setIsModal(true)
    }

    const createNewNote = (data) => {
        const noteId = Math.floor(Math.random() * 10000)
        const dateCreated = new Date().toISOString()
        const newNote = {
            id: noteId,
            title: data.title,
            created: dateCreated,
            category: data.category,
            content: data.content,
            isArchive: false,
        }
        return newNote
    }

    const addNote = (data) => {

        if (currentNoteId) {
            setCurrentNoteId(0)
        } else {
            const note = createNewNote(data)
            dispatch(action.addNote(note))
        }
        setIsModal(false)
    }

    if (isModal) {
        modalData = notes.find(n => n.id === currentNoteId)
    }
    return (
        <div className={s.app}>
            <NotesTable data={notes} openIsModal={openIsModal}/>
            <div className={s.buttonContainer}>
                <button className={s.buttonModal} onClick={openIsModal}>Create New Note</button>

            </div>
            <SummaryTable data={notes}/>
            {
                isModal && <Modal addNote={addNote} closeModal={closeModal}
                                  data={modalData}/>
            }
        </div>
    );
}

export default App;
