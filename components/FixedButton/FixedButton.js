import styles from './FixedButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function FixedButton({
  active,
  onClick,
  top,
  left,
  icon,
  bg,
  text,
  href,
}) {

  let jss = {
    top: top,
    left: left,
    backgroundColor: bg,
  }

  if (active) {

    if (href) {

      return (
        <Link href={href}>
          <button onClick={onClick} className={styles.button} style={jss}>
            <FontAwesomeIcon icon={icon} />
          </button>
        </Link>
      )

    } else {

      return (
        <button onClick={onClick} className={styles.button} style={jss}>
          <FontAwesomeIcon icon={icon} />
        </button>
      )

    }







  } {
    return null
  }


}
