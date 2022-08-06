import styles from './ErrorMessage.module.css'

export default function ErrorMessage({
  message,
}) {
  return(
    <> {message ? <p error='active' className={styles.error}>{message}</p> : null } </>
  )
}