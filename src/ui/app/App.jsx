import s from './App.module.css';
import {SummaryTable} from "../features/SummaryTable";
import {Modal} from "../common/Modal/Modal";
import {useEffect, useState} from "react";
import {NotesTable} from "../features/NotesTable";
import {useDispatch, useSelector} from "react-redux";
import {action, getNotes} from "../../bll/notes-reduser/notes-reducer";
import {getNotesSelector} from "../../bll/selectors";
import {Preloader} from "../common/preloader/Preloader";

export const manufacturerID = () => Math.floor(Math.random() * 1000000)

function App() {
    const dispatch = useDispatch()
    const [isModal, setIsModal] = useState(false)
    const [currentNoteId, setCurrentNoteId] = useState(0)
    let modalData = []
    const notes = useSelector((state) => getNotesSelector(state))

    useEffect(() => {

            dispatch(getNotes())

    }, [])

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
        const noteId = manufacturerID()
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
    const deleteNote = (id) => {
        dispatch(action.deleteNote(id))
    }

    if (isModal) {
        modalData = notes.find(n => n.id === currentNoteId)
    }

    if(!notes.length) {
        return <Preloader/>
    }

    return (
        <div className={s.app}>
            <NotesTable notes={notes} setCurrentNoteId={setCurrentNoteId}
                        openIsModal={openIsModal} deleteNote={deleteNote}/>
            <div className={s.buttonContainer}>
                <button className={s.buttonModal} onClick={openIsModal}>Create New Note</button>

            </div>
            <SummaryTable notes={notes}/>
            {
                isModal && <Modal addNote={addNote} closeModal={closeModal}
                                  data={modalData}/>
            }
        </div>
    );
}

export default App;
