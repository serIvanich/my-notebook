import React from "react";
import s from './Table.module.css'
import {BiTrashAlt, BiPencil, BiArchiveOut} from "react-icons/bi";
import {FcIdea, FcDecision, FcList, FcReddit} from "react-icons/fc";


export const Table = ({data}) => {


    const keys = Object.keys(data[0])
    const headerTable = keys.map((key, ind) => {
        if (key === 'imgCategory') {
            return <div key={key + ind} className={s.tableCell} style={{width:'3%'}}></div>
        } else if (key === 'buttons') {
            const buttonArchive = data[ind].buttons.buttonsHeader.buttonArchive
            const buttonDelete = data[ind].buttons.buttonsHeader.buttonDelete


            return <div key={ind} className={s.tableCell} style={{textAlign: "right"}}>
                <button onClick={buttonArchive}><BiArchiveOut/></button>
                <button onClick={buttonDelete}><BiTrashAlt/></button>
            </div>
        } else {
            return <div key={key + ind} className={s.tableCell}>{key}</div>
        }
    })

    const contentTable = data.map((el, ind) => {
        const row = Object.keys(el).map((key, ind) => {

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
                return <div key={key + ind} className={s.tableCell}>
                    {imgCategory}
                </div>
            }else if (key === 'buttons') {
                const buttonEdit = data[ind].buttons.buttonsContent.buttonEdit
                const buttonArchive = data[ind].buttons.buttonsContent.buttonArchive
                const buttonDelete = data[ind].buttons.buttonsContent.buttonDelete

                return <div key={key + ind} className={s.tableCell} style={{textAlign: "right"}}>
                    <button onClick={buttonEdit}><BiPencil/></button>
                    <button onClick={buttonArchive}><BiArchiveOut/></button>
                    <button onClick={buttonDelete}><BiTrashAlt/></button>
                </div>
            } else {
                return <div key={key + ind} className={s.tableCell}>
                    {el[key].length > 20 ? el[key].slice(0, 20) : el[key]}
                </div>
            }
        })
        return <div key={ind} className={s.tableRow}>{row}</div>
    })

    return (
        <div className={s.tableContainer}>
            <div className={s.tableHeader}>
                {headerTable}
            </div>
            <div className={s.tableRowGroup}>
                {contentTable}
            </div>


        </div>
    )
}
