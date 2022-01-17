import React from "react";
import {Table} from "../common/Table/Table";


export const NotesTable = ({data}) => {
    const notesArr = []


    function createNotesData(obj) {

        const onClickButton = (e) => {
            console.log(`notes ${e}`)
        }


        let dates = obj.content.match(/\d{2}.\d{2}.\d{4}/g)
        if (!dates) {
            dates = ''
        }


        const resultObj = {
            imgCategory:  obj.category,
            name: obj.title,
            created: obj.created,
            category: obj.category,
            content: obj.content,
            dates,
            buttons: {
                buttonsHeader: {
                    buttonArchive: onClickButton,
                    buttonDelete: onClickButton,
                },
                buttonsContent: {
                    buttonEdit: onClickButton,
                    buttonArchive: onClickButton,
                    buttonDelete: onClickButton,
                },
            },
        }
        notesArr.push(resultObj)
    }

    data.forEach(obj => createNotesData(obj))

    return (
        <div>
            <Table data={notesArr}/>
        </div>
    )
}