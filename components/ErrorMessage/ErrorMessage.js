import styles from './ErrorMessage.module.css'

export default function ErrorMessage({
  message,
}) {
  return(
    <> {message ? <p className={styles.error}>{message}</p> : null } </>
  )
}