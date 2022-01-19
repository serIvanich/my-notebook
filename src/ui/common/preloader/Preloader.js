import React from "react"
import preloader from '../../../assecs/image/preload.gif'
import s from './Preloader.module.css'

export const Preloader = () => {

    return (
        <div className={s.preloaderStyle}>
            <img src={preloader} alt={''}/>
        </div>
    )
}
