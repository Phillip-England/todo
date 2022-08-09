import styles from './SubRouteActionBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function SubRouteActionBar({
  toggleAddFeatureForm,
}) {
  return (
    <div className={`${styles.wrapper}`}>
      <FontAwesomeIcon icon={faTrash} className={`${styles.icon} ${styles.trash}`} />
      <FontAwesomeIcon icon={faPen} className={`${styles.icon}`} />
      <FontAwesomeIcon icon={faPlus} className={`${styles.icon}`} onClick={()=>{toggleAddFeatureForm()}} />
    </div>
  )
}
