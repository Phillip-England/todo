import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import styles from './BackButton.module.css'

export default function BackButton({
  active
}) {
  if (active) {
    return(
      <button className={styles.button}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>     
    )
  } 
}
