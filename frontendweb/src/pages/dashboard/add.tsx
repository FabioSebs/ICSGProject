import React, { FunctionComponent } from 'react'
import ActionForm from '@/components/ActionForm'
import styles from "../../styles/actionForm.module.css"

const add : FunctionComponent = () => {
  return (
    <div className={styles.actionDiv}>
        <ActionForm action='add'/>
    </div>
  )
}

export default add