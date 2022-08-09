import styles from './SubRouteListItem.module.css'
import H3 from '../H3/H3'
import P4 from '../P4/P4'
import SubRouteActionBar from '../SubRouteActionBar/SubRouteActionBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export default function SubRouteListItem({
  subRoute,
  mainRoute,
  toggleAddFeatureForm,
  activeSubRoute,
  setActiveSubRoute,
}) {

  if (activeSubRoute._id === subRoute._id) {
    return (
      <li key={subRoute._id} className={`${styles.wrapper} ${styles.activeWrapper}`} >
        <div className={styles.headerWrapper} onClick={()=>{setActiveSubRoute("")}}>
          <H3 text={subRoute.name} className={styles.header} />
          <P4 text={`/${mainRoute.name.toLowerCase()}/${subRoute.name.toLowerCase()}`} className={styles.subhead} />
          <FontAwesomeIcon icon={faCaretDown} className={`${styles.icon} ${styles.activeIcon}`} />
        </div>
        <SubRouteActionBar toggleAddFeatureForm={toggleAddFeatureForm} />
      </li>  
    )
  } else {
    return (
      <li key={subRoute._id} className={styles.wrapper} >
        <div className={styles.headerWrapper} onClick={()=>{setActiveSubRoute(subRoute)}}>
          <H3 text={subRoute.name} className={styles.header} />
          <P4 text={`/${mainRoute.name.toLowerCase()}/${subRoute.name.toLowerCase()}`} className={styles.subhead} />
          <FontAwesomeIcon icon={faCaretUp} className={styles.icon} />
        </div>
      </li>  
    )
  }



}
