import React, { FunctionComponent } from 'react'
import ActionForm from '@/components/ActionForm'
import styles from "../../styles/actionForm.module.css"

const Phone : FunctionComponent = () => {
  return (
    <div className={styles.actionDiv}>
        <ActionForm action='phone' />
    </div>
  )
}

export default Phone