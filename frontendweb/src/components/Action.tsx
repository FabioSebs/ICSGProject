import React, { FunctionComponent, useEffect, useRef } from 'react'
import styles from "../styles/Action.module.css"
import Router from 'next/router'


interface Props {
    action : string
    desc : string
    color : string
}

const Action: FunctionComponent<Props> = ({action, desc, color}) => {
    const actionDiv = useRef<any>(null)

    useEffect(()=>{
        actionDiv.current.style.backgroundColor = color
    },[])

    return (
        <button ref={actionDiv} className={styles.actionDiv} onClick={()=>{Router.push(`dashboard/${action}`)}}>
            <h1>{action}</h1>
            <h3>{desc}</h3>
        </button>
    )
}

export default Action