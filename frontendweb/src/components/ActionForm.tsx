import React, { FunctionComponent, useEffect, useState } from 'react'
import { User } from '@/redux/user'
import styles from "../styles/actionForm.module.css"

interface Props {
    action: string
}

const mockData: User[] = [
    { admin: false, password: "password", phone: "11111", username: "fabio" },
    { admin: false, password: "password", phone: "11111", username: "fabio" },
    { admin: false, password: "password", phone: "11111", username: "fabio" },
]

function renderActions(action: string, handleAddUser: any, admin: boolean, setAdmin: React.Dispatch<React.SetStateAction<boolean>>) {
    switch (action) {
        case 'add':
            return <>
                <div className={styles.actionEntry}>
                    <label>Add User</label>
                    <input type="text" />
                </div>

                <div className={styles.actionEntry}>
                    <label>Add Password</label>
                    <input type="password" />
                </div>

                <div className={styles.actionEntry}>
                    <label>Add Mobile</label>
                    <input type="text" />
                </div>

                <div className={styles.adminInputDiv}>
                    <label>{admin ? "Remove Admin" : "Add Admin"}</label>
                    <div>
                        <input className={styles.adminInput} onClick={() => setAdmin(a => !a)} type="button" value={admin ? "Admin User" : "Regular User"} />
                    </div>
                </div>

                <button className={styles.submitButton} onClick={() => { handleAddUser() }}>{action}</button>
            </>

        case 'delete':
            return <>
                <div className={styles.actionEntry}>
                    <label>Delete User by Username</label>
                    <input type="text" />
                </div>
                <button className={styles.submitButton} onClick={() => { handleAddUser() }}>{action}</button>
            </>

        case 'modify':
            return <>
                <div className={styles.actionEntry}>
                    <label>Modify User by Username</label>
                    <input type="text" />
                </div>
                <div className={styles.actionEntry}>
                    <label>Change Username</label>
                    <input type="text" />
                </div>

                <div className={styles.actionEntry}>
                    <label>Change Password</label>
                    <input type="password" />
                </div>

                <div className={styles.actionEntry}>
                    <label>Change Mobile Number</label>
                    <input type="text" />
                </div>

                <button className={styles.submitButton} onClick={() => { handleAddUser() }}>{action}</button>
            </>
    }
}

const ActionForm: FunctionComponent<Props> = ({ action }) => {
    const [completedMsg, setCompletedMsg] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [admin, setAdmin] = useState<boolean>(false)

    useEffect(() => {
        // Get All Users from DB
    }, [])

    useEffect(() => {
        // Get All Users from DB
    }, [refresh])

    function handleAddUser() {
        // Handle Post Request
        setRefresh(r => !r)
    }

    return (
        <div>
            {/* Form For Action */}
            <form className={styles.actionDivForm}>
                {renderActions(action, handleAddUser, admin, setAdmin)}
            </form>

            {/* Database Information */}
            <div className={styles.actionTable}>
                {/* Headers */}
                <div className={styles.actionTableHeaders}>
                    <p>Username</p>
                    <p>Password</p>
                    <p>Phone</p>
                </div>


                {/* Table Data */}
                {mockData.map((el) => {
                    return (
                        <div className={styles.actionTableRows}>
                            <p>{el.username}</p>
                            <p>{el.password}</p>
                            <p>{el.phone}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ActionForm   