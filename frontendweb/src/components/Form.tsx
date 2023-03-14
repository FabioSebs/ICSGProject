import React, { FunctionComponent, useState, useEffect, MouseEvent } from 'react'
import styles from "../styles/Form.module.css"
// to read data and change data
import { useSelector, useDispatch } from 'react-redux'
import { addPassword, addPhone, addUser, addAdmin } from "../redux/user"
import { redirect } from 'next/navigation'
import Router from 'next/router'
import Splashscreen from './Splashscreen'
import { useCookies } from 'react-cookie'
import axios from "axios"

const Form: FunctionComponent = () => {
  const [type, setType] = useState<boolean>(true)
  const user: any = useSelector((state: any) => state.user.value)
  const dispatch = useDispatch()
  const [message, setMessage] = useState<boolean>(false)
  const [cookies, setCookie, removeCookie] = useCookies(['username']);

  useEffect(()=>{
    removeCookie('username')
  },[])

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    setCookie("username", user.username, { path: '/' });
    console.log(user)
    if (!type) {
      setType(type => !type)
      return
    }

    axios.post("http://localhost/users/add", {
      "username": user.username,
      "password": user.password,
      "mobile": user.mobile
    })
      .then(_ => {
        Router.push("/dashboard")
      })
      .catch(e => {
        console.log(e)
      })
  }

  function handleLogin(event: MouseEvent): void {
    setCookie("username", user.username, { path: '/' });

    if (type) {
      setType(type => !type)
      return
    }
    axios.post("http://localhost/users/login", {
      "username": user.username,
      "password": user.password
    })
      .then(_ => Router.push("/dashboard"))
      .catch(_ => setMessage(true))
      .finally(() => {
        setTimeout(() => {
          setMessage(false)
        }, 2000)
      })

  }

  function handleAdmin() {
    // Toggle Form
    if (type) {
      setType(type => !type)
      // Change Admin Credentials
      dispatch(addUser("admin"))
      dispatch(addPassword("password"))
      dispatch(addAdmin(true))
      return
    }

    // Change Admin Credentials
    dispatch(addUser("admin"))
    dispatch(addPassword("password"))
    dispatch(addAdmin(true))
    // Setup Request
  }


  return (
    <>
      <Splashscreen />
      <form className={styles.formDiv} onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="">Username</label>
          <input type="text" value={user.username} onChange={e => dispatch(addUser(e.target.value))} />
        </div>

        <div className={styles.formField}>
          <label htmlFor="">Password</label>
          <input type="password" value={user.password} onChange={e => { dispatch(addPassword(e.target.value)) }} />
        </div>

        {type && <div className={styles.formField}>
          <label htmlFor="">Phone Number</label>
          <input type="text" value={user.phone} onChange={e => { dispatch(addPhone(e.target.value)) }} />
        </div>}

        {message && <p style={{ color: "red", fontSize: 10, textAlign: 'center' }}>Error Logging In Please Try Again!</p>}

        <div className={styles.formButtons}>
          <button type='submit' className={styles.signupButton}>Signup</button>
          <button type='button' onClick={handleLogin} className={styles.loginButton}>Login</button>
        </div>

      </form>

      <div className={styles.adminDiv} onClick={() => handleAdmin()}>
        <h3>want to try being an admin? <u>Try it Out!</u></h3>
      </div>
    </>
  )
}

export default Form