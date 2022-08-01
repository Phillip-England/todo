import styles from './SmallMessage.module.css'

import HeaderSm from '../HeaderSm/HeaderSm'
import Text from '../Text/Text'

export default function SmallMessage({
  header,
  text
}) {
  return(
    <div className={styles.wrapper}>
      <HeaderSm
        text={header}
        className={styles.header}
      />
      <Text 
        text={text}
        className={styles.text}
      />
    </div>
  )
}