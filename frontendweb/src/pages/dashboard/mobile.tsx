import React, { FunctionComponent } from 'react'
import ActionForm from '@/components/ActionForm'
import styles from "../../styles/actionForm.module.css"

const mobile: FunctionComponent = () => {
  return (
    <div className={styles.actionDiv}>
      <ActionForm action='mobile' />
    </div>
  )
}

export default mobile