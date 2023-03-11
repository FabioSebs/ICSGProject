import React, { FunctionComponent } from 'react'
import ActionForm from '@/components/ActionForm'
import styles from "../../styles/actionForm.module.css"

const Delete : FunctionComponent = () => {
  return (
    <div className={styles.actionDiv}>
        <ActionForm action='delete' />
    </div>
  )
}

export default Delete