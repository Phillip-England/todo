import styles from './HeaderAndSubText.module.css'
import H2 from '../H2/H2'
import P3 from '../P3/P3'
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
        <P3 text={subText} bg={'var(--main-color)'} />
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
