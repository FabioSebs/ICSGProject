import React, { FunctionComponent, useEffect, useState } from 'react'
import { User } from '@/redux/user'
import styles from "../styles/actionForm.module.css"
import axios from 'axios'
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import Router from 'next/router';

interface Props {
    action: string
}

// const mockData: User[] = [
//     { admin: false, password: "password", phone: "11111", username: "fabio" },
//     { admin: false, password: "password", phone: "11111", username: "fabio" },
//     { admin: false, password: "password", phone: "11111", username: "fabio" },
// ]

function renderActions(action: string, admin: boolean, setAdmin: React.Dispatch<React.SetStateAction<boolean>>, setFormInput: React.Dispatch<React.SetStateAction<User>>, form: User, setModifyUser: React.Dispatch<React.SetStateAction<string>>) {
    switch (action) {
        case 'add':
            return <>
                <div className={styles.actionEntry}>
                    <label>Add User</label>
                    <input type="text" onChange={e => setFormInput({ ...form, username: e.target.value })} />
                </div>

                <div className={styles.actionEntry}>
                    <label>Add Password</label>
                    <input type="password" onChange={e => setFormInput({ ...form, password: e.target.value })} />
                </div>

                <div className={styles.actionEntry}>
                    <label>Add Mobile</label>
                    <input type="text" onChange={e => setFormInput({ ...form, mobile: e.target.value })} />
                </div>

                {/* <div className={styles.adminInputDiv}>
                    <label>{admin ? "Remove Admin" : "Add Admin"}</label>
                    <div>
                        <input className={styles.adminInput} onClick={() => setAdmin(a => !a)} type="button" value={admin ? "Admin User" : "Regular User"} />
                    </div>
                </div> */}

                <button type="submit" className={styles.submitButton}>{action}</button>
            </>

        case 'delete':
            return <>
                <div className={styles.actionEntry}>
                    <label>Delete User by Username</label>
                    <input type="text" onChange={e => setFormInput({ ...form, username: e.target.value })} />
                </div>
                <button type='submit' className={styles.submitButton}>{action}</button>
            </>

        case 'modify':
            return <>
                <div className={styles.actionEntry}>
                    <label>Modify User by Username</label>
                    <input type="text" onChange={e => setModifyUser(e.target.value)} />
                </div>
                <div className={styles.actionEntry}>
                    <label>Change Username</label>
                    <input type="text" onChange={e => setFormInput({ ...form, username: e.target.value })} />
                </div>

                <div className={styles.actionEntry}>
                    <label>Change Password</label>
                    <input type="password" onChange={e => setFormInput({ ...form, password: e.target.value })} />
                </div>

                <div className={styles.actionEntry}>
                    <label>Change Mobile Number</label>
                    <input type="text" onChange={e => setFormInput({ ...form, mobile: e.target.value })} />
                </div>

                <button type="submit" className={styles.submitButton}>{action}</button>
            </>

        case 'mobile':
            return <>
                <div className={styles.actionEntry}>
                    <label>Change Mobile Number</label>
                    <input type="text" onChange={e => setFormInput({ ...form, mobile: e.target.value })} />
                </div>

                <button type="submit" className={styles.submitButton}>{action}</button>
            </>

    }
}

function clearFormInputs(setFormInputs: React.Dispatch<React.SetStateAction<User>>) {
    setFormInputs({
        username: "",
        password: "",
        mobile: "",
        admin: false
    })
}

const GetAllUsers = (setAllUsers: React.Dispatch<any>) => {
    const userlist: User[] | null = []

    axios.get("http://localhost:8080/users/all")
        .then((res) => {
            res.data?.forEach((e: any) => {
                let user: User = { admin: false, password: e.password, mobile: e.mobile, username: e.username }
                userlist.push(user)
            })
            setAllUsers(userlist)
        }).catch(e => console.log(e))
}

const ActionForm: FunctionComponent<Props> = ({ action }) => {
    const [completedMsg, setCompletedMsg] = useState<boolean>(false)
    const [allUsers, setAllUsers] = useState<User[] | any>([])
    const [formInput, setFormInput] = useState<User>({ admin: false, password: "", mobile: "", username: "" })
    const [admin, setAdmin] = useState<boolean>(false)
    const [modifyUser, setModifyUser] = useState<string>("");
    const [cookies, setCookie] = useCookies(['username']);

    useEffect(() => {
        // Get All Users from DB
        GetAllUsers(setAllUsers)
    }, [])


    function handleAddUser(e: React.SyntheticEvent) {
        e.preventDefault()

        // Handle Post Request
        axios.post("http://localhost/users/add", {
            "username": formInput.username,
            "password": formInput.password,
            "mobile": formInput.mobile
        })
            .then((_) => window.location.reload())
            .then(_ => clearFormInputs(setFormInput))
            .catch(e => console.log(e))


    }

    function handleDeleteUser(e: React.SyntheticEvent) {
        e.preventDefault()

        axios.delete("http://localhost/users/delete", { data: { "username": formInput.username } })
            .then(e => console.log(e.data))
            .then(_ => clearFormInputs(setFormInput))
            .catch(e => console.log(e))

        window.location.reload()
    }

    function handleUpdateUser(e: React.SyntheticEvent) {
        e.preventDefault()
        axios.patch(`http://localhost/users/update/user/`, {
            "original": modifyUser,
            "username": formInput.username,
            "password": formInput.password,
            "mobile": formInput.mobile
        })
            .then(_ => window.location.reload())
            .then(_ => clearFormInputs(setFormInput))
            .catch(e => console.log(e))
    }

    function handleUpdateMobile(e: React.SyntheticEvent) {
        e.preventDefault()
        axios.patch(`http://localhost/users/update/mobile/${cookies.username}`, {
            "mobile": formInput.mobile
        })
            .then(_ => window.location.reload())
            .then(_ => clearFormInputs(setFormInput))
            .catch(e => console.log(e))
    }

    return (
        <div>
            <div style={{position:'absolute', left: "0", top:"0"}} onClick={()=>{Router.back()}}>
                <Image alt='back' src="/back.svg" width={30} height={30} />
            </div>
            {/* Form For Action */}
            <form className={styles.actionDivForm} onSubmit={(e: React.SyntheticEvent) => { action == 'add' ? handleAddUser(e) : action == 'delete' ? handleDeleteUser(e) : action == 'modify' ? handleUpdateUser(e) : action == 'mobile' ? handleUpdateMobile(e) : undefined }}>
                {renderActions(action, admin, setAdmin, setFormInput, formInput, setModifyUser)}
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
                {action == 'mobile' ? allUsers.filter((el: any) => el.username == cookies.username).map((el: any) => {
                    return (
                        <div className={styles.actionTableRows} key={el.username}>
                            <p>{el.username}</p>
                            <p>{el.password}</p>
                            <p>{el.mobile}</p>
                        </div>
                    )
                }) : allUsers.map((el: any) => {
                    return (
                        <div className={styles.actionTableRows} key={el.username}>
                            <p>{el.username}</p>
                            <p>{el.password}</p>
                            <p>{el.mobile}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ActionForm   