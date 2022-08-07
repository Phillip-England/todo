import styles from './HeaderAndSubText.module.css'
import H2 from '../H2/H2'
import P2 from '../P2/P2'

export default function HeaderAndSubText({
  headerText,
  subText,
}) {
  return (
    <div className={styles.wrapper}>
      <H2 text={headerText} />
      <P2 text={subText} bg={'var(--main-color)'} />
  </div>
  )
}
