import React from "react";
import s from './Table.module.css'
import {BiArchiveOut, BiPencil, BiTrashAlt} from "react-icons/bi";
import {FcDecision, FcIdea, FcList, FcReddit} from "react-icons/fc";
import {Table} from "./Table";


export const TableContainer = ({data}) => {


    const keys = Object.keys(data[0])

    const withoutCurrentIdKeys = keys.filter(k => k !== 'currentId')
    const headerTable = withoutCurrentIdKeys.map((key, ind) => {
        if (key === 'imgCategory') {
            return <div key={key + ind} className={s.tableCell}> </div>
        } else if (key === 'buttons') {
            const buttonCallback = data[ind].buttons.buttonCallback


            return <div key={ind} className={s.tableCell} style={{textAlign: "right"}}>
                <button data-set='archive-all' onClick={buttonCallback}><BiArchiveOut/></button>
                <button data-set='delete-all' onClick={buttonCallback}><BiTrashAlt/></button>
            </div>
        } else {
            return <div key={key + ind} className={s.tableCell}>{key}</div>
        }
    })

    const contentTable = data.map((el, ind) => {
        let currentId
        let copyElement = {...el}

        if (el.currentId) {
            currentId = el.currentId
            delete copyElement.currentId
        }
        const rowTable = Object.keys(copyElement).map((key, indexNote) => {
            if (key === 'imgCategory') {

                let imgCategory
                switch (el.category) {
                    case 'task':
                        imgCategory = <FcList/>
                        break
                    case 'quote':
                        imgCategory = <FcReddit/>
                        break
                    case 'random thought':
                        imgCategory = <FcDecision/>
                        break
                    case 'idea':
                        imgCategory = <FcIdea/>
                        break
                }
                return <div key={key + indexNote} className={s.tableCell}>
                    {imgCategory}
                </div>

            } else if (key === 'buttons') {

                const buttonCallback = (e) => {

                    el.buttons.buttonCallback(e, currentId)
                }

                return <div key={key + indexNote} className={s.tableCell} style={{textAlign: "right"}}>
                    <button data-set='edit-note' onClick={buttonCallback}><BiPencil data-set='edit-note'/></button>
                    <button data-set='archive-note' onClick={buttonCallback}><BiArchiveOut data-set='archive-note'/>
                    </button>
                    <button data-set='delete-note' onClick={buttonCallback}><BiTrashAlt data-set='delete-note'/>
                    </button>
                </div>
            } else {
                return <div key={key + indexNote} className={s.tableCell}>
                    {el[key].length > 20 ? el[key].slice(0, 20) : el[key]}
                </div>
            }
        })
        return <div key={ind} className={s.tableRow}>{rowTable}</div>
    })

    return (
        <Table header={headerTable} content={contentTable}/>
    )
}
