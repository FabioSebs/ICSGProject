import React, { FunctionComponent, useState, useEffect, MouseEvent } from 'react'
import styles from "../styles/Form.module.css"
// to read data and change data
import { useSelector, useDispatch } from 'react-redux'
import { addPassword, addPhone, addUser } from "../redux/user"
import { redirect } from 'next/navigation'
import Router from 'next/router'

const Form: FunctionComponent = () => {
  const [type, setType] = useState<boolean>(true)
  const user: any = useSelector((state: any) => state.user.value)
  const dispatch = useDispatch()

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    console.log(user)
    if (!type) {
      setType(type => !type)
      return
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    Router.push("/dashboard")

    // fetch('http://localhost:8080/signup', requestOptions)
    //   .then(response => console.log(response.json()))
    //   .then(() => { redirect('/dashboard') })

  }

  function handleLogin(event: MouseEvent): void {
    if (type) {
      setType(type => !type)
      return
    }
    else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          password: user.password
        })
      };

      fetch('http://localhost:8080/login', requestOptions)
        .then(response => console.log(response.json()))
        .then(_ => { redirect('/dashboard') })
    }
  }

  return (
    <>
      <form className={styles.formDiv} onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <label htmlFor="">Username</label>
          <input type="text" onChange={e => dispatch(addUser(e.target.value))} />
        </div>

        <div className={styles.formField}>
          <label htmlFor="">Password</label>
          <input type="password" onChange={e => { dispatch(addPassword(e.target.value)) }} />
        </div>

        {type && <div className={styles.formField}>
          <label htmlFor="">Phone Number</label>
          <input type="text" onChange={e => { dispatch(addPhone(e.target.value)) }} />
        </div>}

        <div className={styles.formButtons}>
          <button type='submit' className={styles.signupButton}>Signup</button>
          <button type='button' onClick={handleLogin} className={styles.loginButton}>Login</button>
        </div>

      </form>

      <div className={styles.adminDiv}>
        <h3>want to try being an admin? <u>Try it Out!</u></h3>
      </div>
    </>
  )
}

export default Form