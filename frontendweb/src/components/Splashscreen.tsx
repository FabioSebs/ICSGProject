import React , {FunctionComponent, useEffect, useRef} from 'react'
import styles from "../styles/Splash.module.css"
import Image from 'next/image'
// import TechLogo from "../../public/techLoco.svg"
import { motion } from "framer-motion"

const Splashscreen : FunctionComponent = () => {
    const el = useRef<any>(null);

    useEffect(()=>{
        setTimeout(()=>{
            el.current.style.display = "none"
            el.current.style.visibility = "hidden"
        }, 5000)
    }, [])

    return (
        <motion.div className={styles.splash}
            transition={{ delay:1 , duration: 1 }}
            initial={{ opacity: 1, x: 1, zIndex: 3 }}
            animate={{ opacity: 0, x: 0, zIndex: 0 }}
            ref={el}
        >
            <Image src="./techLogo.svg" alt='techlogo' height={200} width={200}/>
            <h1>ICSG</h1>
        </motion.div>
    )
  
}

export default Splashscreen