import styles from './Navbar.module.css'

import HeaderSm from '../HeaderSm/HeaderSm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


export default function Navbar() {

  const [navMenu, setNavMenu] = useState(false)

  return(
    <nav className={`${styles.nav}`}>

      <div className={`${styles.headerContainer}`}>
        <HeaderSm 
          text={'Todo App'} 
          className={styles.header}
        />
        <div className={`${styles.bars}`}>
          {navMenu
            ?
              <FontAwesomeIcon 
                icon={faX}
                onClick={()=>{
                  setNavMenu(!navMenu)
                }}
              />
            :
              <FontAwesomeIcon 
                icon={faBars}
                onClick={()=>{
                  setNavMenu(!navMenu)
                }}
              />
          }

        </div>
      </div>

      {navMenu 
        ? 
          <div className={`${styles.navMenu}`}>
            <ul>
              <li>
                <p>Test</p>
              </li>
            </ul>
          </div>
        : null}

    </nav>
  )
}