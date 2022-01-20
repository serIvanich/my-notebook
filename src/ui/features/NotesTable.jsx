import React from "react";
import {TableDataPrepare} from "./TableDataPrepare";


export const NotesTable = React.memo(({
                                          notes,
                                          openIsModal,
                                          changeArchive,
                                          deleteNote,
                                          showArchive,
                                          showArchiveNotes,
                                          deleteAll,
                                      }) => {

    const dataNotesTable = []


    const buttonCallback = (e, id) => {


        const datasetButton = e.currentTarget.dataset.set
        if (datasetButton === 'edit-note') {

            openIsModal(id)
        } else if (datasetButton === 'delete-note') {
            deleteNote(id)
        } else if (datasetButton === 'archive-note') {
            changeArchive(id)
        } else if (datasetButton === 'archive-all') {
            showArchiveNotes()
        } else if (datasetButton === 'delete-all') {
            deleteAll()
        }

    }

    function createTableData(obj) {
        let dates = obj.content.match(/(\d{1,2}[-./]\d{2}[-./]\d{4})/g)
        if (!dates) {
            dates = ''
        } else {
            dates = dates.join(' ')
        }
        return {
            currentId: obj.id,
            imgCategory: obj.category,
            title: obj.title,
            created: obj.created,
            category: obj.category,
            content: obj.content,
            dates,
            buttons: {
                buttonCallback

            },
        }

    }

    if (!notes.length) {
        let text = !showArchive ? 'only archive' : 'not archive'

        return <div> you have {text} notes <button data-set='archive-all' onClick={buttonCallback}>go out</button></div>
    }
    for (let el of notes) {
        const newEl = createTableData(el)
        dataNotesTable.push(newEl)
    }
    return (
        <div>
            <TableDataPrepare dataTable={dataNotesTable}/>
        </div>
    )
})