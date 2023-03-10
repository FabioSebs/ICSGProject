import { NextPage } from 'next'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import styles from "../../styles/Dashboard.module.css"
import { useSelector, useDispatch, Provider } from 'react-redux'
import store from "../../redux/store"
import UserLogo from '@/components/UserLogo'
import { CookiesProvider } from 'react-cookie'
// import {} from "../redux/user"

const Dashboard: NextPage = () => {
    useEffect(() => {
        // fetch("http://localhost:8080/user/")
    }, [])

    return (
        <CookiesProvider>
            <Provider store={store}>
                <main className={styles.dashboardDiv}>
                    <UserLogo />
                </main>
            </Provider>
        </CookiesProvider>
    )
}

export default Dashboard