import React from "react";
import {Table} from "../common/Table/Table";

export const SummaryTable = ({data}) => {
    const summaryArr = []
    function createSummaryData(obj) {
        const isArchive = obj.isArchive
        const resObj = {
            imgCategory:  obj.category,
            category: obj.category,
            active: isArchive?0:1,
            archive: isArchive?1:0,
        }

        const indObj = summaryArr.findIndex(obj => obj.category === resObj.category)
        if (indObj > -1) {
            isArchive?summaryArr[indObj].archive += resObj.archive
                :summaryArr[indObj].active += resObj.active
        }else {
            summaryArr.push(resObj)
        }

    }
    data.forEach(obj => createSummaryData(obj))

    return (
        <div>
            <Table data={summaryArr}/>
        </div>
    )
}