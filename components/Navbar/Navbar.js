import styles from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'

import HeaderSm from '../HeaderSm/HeaderSm'
import Text from '../Text/Text'

export default function Navbar() {

  const [navMenu, setNavMenu] = useState(false)

  return(
    <nav className={`${styles.nav}`}>

      <div className={`${styles.headerContainer}`}>
        <HeaderSm text={'Project Planner'} className={styles.header} />
        <div className={`${styles.icon}`}>
          {navMenu
            ? <FontAwesomeIcon icon={faX} onClick={()=>{setNavMenu(!navMenu)}} />
            : <FontAwesomeIcon icon={faBars} onClick={()=>{setNavMenu(!navMenu)}} />
          }
        </div>
      </div>

      {navMenu 
        ? 
          <div className={`${styles.navMenu}`}>
            <ul>
              <li className={`${styles.linkWrapper}`}> 
                <Link href='/app/logout'>Logout</Link> 
              </li>
            </ul>
          </div>
        : null}

    </nav>
  )
}