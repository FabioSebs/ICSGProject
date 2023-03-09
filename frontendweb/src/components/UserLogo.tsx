import React, { FunctionComponent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Action from './Action'
import styles from "../styles/Dashboard.module.css"
import Router from 'next/router'

const UserLogo: FunctionComponent = () => {
    const user: any = useSelector((state: any) => state.user.value)

    useEffect(() => {
        console.log(user)
    }, [])

    return (
        <div className={styles.innerDashboard}>
            <Image alt='user' src="/user.svg" height={100} width={100} />

            <div className={styles.userInfo}>
                <h1>{user.username}</h1>
                <h1>{user.phone}</h1>
            </div>

            <div className={styles.userActions}>
                <Action action='phone' color='yellow' desc='change mobile phone number'/>
            </div>

            <div className={styles.backArrow} onClick={()=>{Router.back()}}>
                <Image alt='user' src="/back.svg" height={40} width={40} />
            </div>
        </div>

    )
}

export default UserLogo