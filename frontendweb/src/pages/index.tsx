import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Splashscreen from '@/components/Splashscreen'
import Form from '@/components/Form'
import { Provider } from 'react-redux'
import store from "../redux/store"

export default function Home() {
  

  return (
    <Provider store={store}>
      <Head>
        <title>ICSG</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.homeDiv}>
        <Splashscreen />
        <Form />
      </main>
    </Provider>
  )
}