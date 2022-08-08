import styles from './FixedButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FixedButton({
  active,
  onClick,
  top,
  left,
  icon,
  bg,
  text,
}) {

  let jss = {
    top: top,
    left: left,
    backgroundColor: bg,
  }

  if (active) {
    return (
      <button onClick={onClick} className={styles.button} style={jss}>
        <FontAwesomeIcon icon={icon} />
      </button>
    )
  } {
    return null
  }


}
