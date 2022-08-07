import styles from './HeaderAndSubText.module.css'
import H2 from '../H2/H2'
import P2 from '../P2/P2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HeaderAndSubText({
  headerText,
  subText,
  icon,
  onClick
}) {

  if (icon) {
    return (
      <div className={`${styles.wrapper} ${styles.grid}`}>
        <H2 text={headerText} />
        <P2 text={subText} bg={'var(--main-color)'} />
        <FontAwesomeIcon icon={icon} className={styles.icon} onClick={onClick} />
      </div>
    )
  } else {
    return (
      <div className={styles.wrapper}>
        <H2 text={headerText} />
        <P2 text={subText} bg={'var(--main-color)'} />
      </div>
    )
  }


}
