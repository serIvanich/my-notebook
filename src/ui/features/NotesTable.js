import React from "react";
import {Table} from "../common/Table/Table";
import {TableContainer} from "../common/Table/TableContainer";


export const NotesTable = ({data, setCurrentNoteId, setIsModal}) => {
    const notesArr = []


    function createNotesData(obj) {

        const buttonCallback = (e, id) => {
            if(id) {
                setCurrentNoteId(id)
            }
            setIsModal(true)
            console.log(e.currentTarget.dataset.set)
            console.log(id)
        }


        let dates = obj.content.match(/\d{2}.\d{2}.\d{4}/g)
        if (!dates) {
            dates = ''
        }


        const resultObj = {
            currentId: obj.id,
            imgCategory:  obj.category,
            name: obj.title,
            created: obj.created,
            category: obj.category,
            content: obj.content,
            dates,
            buttons: {
                buttonCallback

            },
        }
        notesArr.push(resultObj)
    }

    data.forEach(obj => createNotesData(obj))

    return (
        <div>
            <TableContainer data={notesArr}/>
        </div>
    )
}