import React from "react";
import s from './Table.module.css'


export const Table = React.memo(({header, content}) => {


    return (
        <div className={s.tableContainer}>
            <div className={s.tableHeader}>
                {header}
            </div>
            <div className={s.tableRowGroup}>
                {content}
            </div>
        </div>
    )
})
