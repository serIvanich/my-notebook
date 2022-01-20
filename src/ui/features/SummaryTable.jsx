import React from "react";
import {TableDataPrepare} from "./TableDataPrepare";

export const SummaryTable = React.memo(({notes}) => {
    const summaryArr = []

    function createSummaryData(note) {
        const isArchive = note.isArchive
        const resObj = {
            imgCategory: note.category,
            category: note.category,
            active: isArchive ? 0 : 1,
            archive: isArchive ? 1 : 0,
        }

        const indObj = summaryArr.findIndex(obj => obj.category === resObj.category)
        if (indObj > -1) {
            isArchive ? summaryArr[indObj].archive += resObj.archive
                : summaryArr[indObj].active += resObj.active
        } else {
            summaryArr.push(resObj)
        }

    }

    notes.forEach(note => createSummaryData(note))

    return (
        <div>
            <TableDataPrepare dataTable={summaryArr}/>
        </div>
    )
})