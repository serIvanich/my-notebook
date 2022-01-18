import s from './App.module.css';
import {failState} from "../../bll/fail-state";
import {SummaryTable} from "../features/SummaryTable";
import {Modal} from "../common/Modal/Modal";
import {useState} from "react";
import {NotesTable} from "../features/NotesTable";

function App() {

    const [isModal, setIsModal] = useState(false)
    const [currentNoteId, setCurrentNoteId] = useState(null)
    let modalData = []

    if (isModal) {

        modalData = failState.find(n => n.id === currentNoteId)
    }
    const changeIsModal = () => {
        setIsModal(!isModal)
    }

    return (
        <div className={s.app}>
            <NotesTable data={failState} setCurrentNoteId={setCurrentNoteId} setIsModal={setIsModal}/>
            <div className={s.buttonContainer}>
                <button className={s.buttonModal} onClick={changeIsModal}>Create New Note</button>

            </div>
            <SummaryTable data={failState}/>
            {isModal && <Modal isModal={isModal} changeIsModal={changeIsModal} data={modalData}/>}
        </div>
    );
}

export default App;


// <div className="notes" id="notes">
//     <div className="notes__table-header">
//         NOT NOTES
//     </div>
//
// </div>
// <div className="button-container">
//     <button className="button-open-Modal" id="button-form">create note</button>
// </div>
// <div className="categories">
//     <div className="categories__header">
//         <div className="categories__header-category">category</div>
//         <div className="categories__header-active">active</div>
//         <div className="categories__header-archive">archive</div>
//     </div>
//     <div className="categories__content">
//
//     </div>
// </div>