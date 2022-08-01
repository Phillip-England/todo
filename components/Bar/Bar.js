import styles from './Bar.module.css'

export default function Bar({
  text
}) {
  return(
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{text}</h1>
    </div>
  )
}