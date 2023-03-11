import React, { FunctionComponent } from 'react'
import ActionForm from '@/components/ActionForm'
import styles from "../../styles/actionForm.module.css"

const modify : FunctionComponent = () => {
  return (
    <div className={styles.actionDiv}>
        <ActionForm action='modify' />
    </div>
  )
}

export default modify