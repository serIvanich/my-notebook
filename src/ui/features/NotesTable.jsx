import React from "react";
import {TableContainer} from "../common/Table/TableContainer";


export const NotesTable = ({data, openIsModal}) => {


    const notesData = []

    const buttonCallback = (e, id) => {
        if (id) {
            openIsModal(id)
        }
        console.log(e.currentTarget.dataset.set)
        console.log(id)
    }

    function createNotesData(obj) {
        let dates = obj.content.match(/\d{2}.\d{2}.\d{4}/g)
        if (!dates) {
            dates = ''
        }
        const resultObj = {
            currentId: obj.id,
            imgCategory: obj.category,
            name: obj.title,
            created: obj.created,
            category: obj.category,
            content: obj.content,
            dates,
            buttons: {
                buttonCallback

            },
        }
        notesData.push(resultObj)
    }

    data.forEach(obj => createNotesData(obj))

    return (
        <div>
            <TableContainer data={notesData}/>
        </div>
    )
}