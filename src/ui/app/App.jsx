import s from './App.module.css';
import {SummaryTable} from "../features/SummaryTable";
import {Modal} from "../common/Modal/Modal";
import {useEffect, useState} from "react";
import {NotesTable} from "../features/NotesTable";
import {useDispatch, useSelector} from "react-redux";
import {action} from "../../bll/notes-reducer/notes-reducer";
import {getInitializedSelector, getNotesSelector} from "../../bll/selectors";
import {Preloader} from "../common/preloader/Preloader";
import {initializeApp} from "../../bll/app-reducer/app-reducer";

export const manufacturerID = () => Math.floor(Math.random() * 1000000)

function App() {
    const dispatch = useDispatch()
    const [showArchive, setShowArchive] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [currentNoteId, setCurrentNoteId] = useState(0)
    let modalData = []
    let tableNotes
    const notes = useSelector((state) => getNotesSelector(state))
    const {isInitialized, error} = useSelector((state) => getInitializedSelector(state))

    useEffect(() => {

        dispatch(initializeApp())

    }, [dispatch])

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
        return {
            id: noteId,
            title: data.title,
            created: dateCreated,
            category: data.category,
            content: data.content,
            isArchive: data.isArchive,
        }

    }

    const addNote = (data) => {

        if (currentNoteId) {
            dispatch(action.updateNote(currentNoteId, data))
            setCurrentNoteId(0)
        } else {
            const note = createNewNote(data)
            dispatch(action.addNote(note))
        }
        setIsModal(false)
    }
    const updateNote = (id, data) => {
        dispatch(action.updateNote(id, data))
    }
    const changeArchive = (id) => {
        if (showArchive) {
            updateNote(id, {isArchive: false})
        } else {
            updateNote(id, {isArchive: true})
        }
    }
    const deleteNote = (id) => {
        dispatch(action.deleteNote(id))
    }
    const deleteAll = () => {
        const answer = prompt('Do you want to remove all notes when you click this button?' +
            '\nIf you are accept them, please enter: YES')
        if (answer.toLowerCase() === 'yes') {
            alert('Sorry, but it is not possible in the moment)))')
        }
    }
    const showArchiveNotes = () => {
        setShowArchive(!showArchive)
    }

    if (isModal) {
        modalData = notes.find(n => n.id === currentNoteId)
    }

    if (!isInitialized) {
        return <Preloader/>
    }
    if (error) {
        return <div>`${error}`</div>
    }
    if (showArchive && notes) {
        tableNotes = notes.filter(note => note.isArchive === true)
    } else {
        tableNotes = notes.filter(note => note.isArchive === false)
    }


    return (
        <div className={s.app}>
            <NotesTable notes={tableNotes} setCurrentNoteId={setCurrentNoteId}
                        openIsModal={openIsModal} deleteNote={deleteNote} changeArchive={changeArchive}
                        showArchiveNotes={showArchiveNotes} showArchive={showArchive} deleteAll={deleteAll}/>
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
