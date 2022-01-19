import React from "react";
import {TableContainer} from "../common/Table/TableContainer";


export const NotesTable = ({notes, openIsModal, deleteNote,}) => {

    const dataNotesTable = []


    const buttonCallback = (e, id) => {


        const datasetButton = e.currentTarget.dataset.set
        if (datasetButton === 'edit-note') {

            openIsModal(id)
        } else if (datasetButton === 'delete-note') {
            deleteNote(id)
        }
        console.log(e.currentTarget.dataset.set)
        console.log(id)
    }

    function createTableData(obj) {
        let dates = obj.content.match(/\d{2}.\d{2}.\d{4}/g)
        if (!dates) {
            dates = ''
        }
        const data = {
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
        return data
    }

    for(let el of notes){
        const newEl = createTableData(el)
        dataNotesTable.push(newEl)
    }

    return (
        <div>
            <TableContainer dataTable={dataNotesTable}/>
        </div>
    )
}