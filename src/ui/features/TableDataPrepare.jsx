import React from "react";
import s from '../common/Table/Table.module.css'
import {BiArchiveOut, BiPencil, BiTrashAlt} from "react-icons/bi";
import {FcDecision, FcIdea, FcList, FcReddit} from "react-icons/fc";
import {Table} from "../common/Table/Table";
import {manufacturerID} from "../app/App";


export const TableDataPrepare = React.memo(({dataTable}) => {

    let headerTable = []


    const content = dataTable.map(note => {
        const copyNote = {...note}
        let currentId
        if (note.currentId) {
            currentId = note.currentId
            delete copyNote.currentId
        }

        const headerItems = Object.keys(copyNote)

        if (headerTable.length < headerItems.length) {
            let buttonCallBack
            if (note.buttons) {
                buttonCallBack = note.buttons.buttonCallback
            }
            headerTable = headerItems.map(item => createHeaderItem(item, buttonCallBack))

        }

        const rowTable = createContentItem(note, headerItems, currentId)
        return <div key={manufacturerID()} className={s.tableRow}>{rowTable}</div>


    })


    function createHeaderItem(item, buttonCallback) {
        const id = manufacturerID()
        if (item === 'imgCategory') {
            return (<div key={id} className={s.tableCell}> </div>)
        } else if (item === 'buttons') {
            return (<div key={id} className={s.tableCell} style={{textAlign: "right"}}>
                <button data-set='archive-all' onClick={buttonCallback}><BiArchiveOut/></button>
                <button data-set='delete-all' onClick={buttonCallback}><BiTrashAlt/></button>
            </div>)
        } else {
            return (<div key={id} className={s.tableCell}>{item}</div>)
        }
    }

    function createContentItem(note, items, currentId) {

       return   items.map(item => {
            const id = manufacturerID()
            if (item === 'imgCategory') {

                let imgCategory
                switch (note.category) {
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
                    default:
                        break
                }
                return (<div key={id} className={s.tableCell}>{imgCategory}</div>)

            } else if (item === 'buttons') {

                const buttonCallback = (e) => {

                    note.buttons.buttonCallback(e, currentId)
                }

                return (<div key={id} className={s.tableCell} style={{textAlign: "right"}}>
                    <button data-set='edit-note' onClick={buttonCallback}><BiPencil data-set='edit-note'/></button>
                    <button data-set='archive-note' onClick={buttonCallback}><BiArchiveOut data-set='archive-note'/>
                    </button>
                    <button data-set='delete-note' onClick={buttonCallback}><BiTrashAlt data-set='delete-note'/>
                    </button>
                </div>)
            } else {
                return (<div key={id} className={s.tableCell}>
                    {note[item].length > 20 ? note[item].slice(0, 20) : note[item]}
                </div>)
            }

        })
    }


    return (
        <Table header={headerTable} content={content}/>
    )

})
