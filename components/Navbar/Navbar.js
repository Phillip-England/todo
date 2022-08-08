import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faBars, faHome, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'

import styles from './Navbar.module.css'

export default function Navbar({
  navText,
}) {

  const [navMenu, setNavMenu] = useState(false)

  return(
    <nav className={`${styles.nav}`}>

      <div className={`${styles.headerContainer}`}>
        <h1 className={`${styles.header}`}>{navText}</h1>
        <div className={`${styles.icon}`}>
          {navMenu
            ? <FontAwesomeIcon icon={faX} onClick={()=>{setNavMenu(!navMenu)}}/>
            : <FontAwesomeIcon icon={faBars} onClick={()=>{setNavMenu(!navMenu)}}/>
          }
        </div>
      </div>

      {navMenu 
        ?
          <ul className={styles.navMenuWrapper}>
            <div className={styles.navMenuSpacer}></div>
            <li className={styles.navItemWrapper}>
              <Link href={'/app/home'}>
                <FontAwesomeIcon icon={faHome} onClick={()=>{setNavMenu(!navMenu)}} />
              </Link>
            </li>
            <li className={styles.navItemWrapper}>
              <Link href={'/app/logout'}>
                <FontAwesomeIcon icon={faDoorOpen} onClick={()=>{setNavMenu(!navMenu)}} />
              </Link>
            </li>
          </ul>
        : null
      }



    </nav>
  )
}