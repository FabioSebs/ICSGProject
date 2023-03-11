import React, { FunctionComponent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import Action from './Action'
import styles from "../styles/Dashboard.module.css"
import Router from 'next/router'
import { addAdmin } from '@/redux/user'

const UserLogo: FunctionComponent = () => {
    const [admin, setAdmin] = useState<boolean>(false)
    const user: any = useSelector((state: any) => state.user.value)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setAdmin(user.username == "admin")
    }, [])

    return (
        <div className={styles.innerDashboard}>
            {admin ? 
            <Image alt='user' src="/superman.svg" height={100} width={100} /> : 
            <Image alt='user' src="/user.svg" height={100} width={100} /> 
            }
            

            <div className={styles.userInfo}>
                <h1>{user.username}</h1>
                <h1>{user.phone}</h1>
            </div>

            <div className={styles.userActions}>
                {!admin && <Action action='phone' color='yellow' desc='change mobile phone number'/>}
                {admin && <Action action='add' color='blue' desc='add user to system'/>}
                {admin && <Action action='delete' color='red' desc='delete user to system'/>}
                {admin && <Action action='modify' color='green' desc='modify user to system'/>}

            </div>

            <div className={styles.backArrow} onClick={()=>{Router.back()}}>
                <Image alt='user' src="/back.svg" height={40} width={40} />
            </div>
        </div>

    )
}

export default UserLogo