import React from "react";
import s from './Table.module.css'


export const Table = ({header, content}) => {



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
}
