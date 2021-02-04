import React from 'react'
import styles from './../../App.module.css'

const imgurl = "https://www.veeam.com/content/dam/veeam/global/veeam-graphics/veeam_logo_white-500.png.web.1280.1280.png?ck=1572622163865&ck=1572622163865"

export const Header = () =>{
    return <div className={styles.header}>
        <div className={styles.headerlogo}><img src={imgurl} alt=""/></div>

    </div>
}