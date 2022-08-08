import styles from './ErrorMessage.module.css'

export default function ErrorMessage({
  message,
  className,
}) {
  return(
    <> {message ? <p error='active' className={`${styles.error} ${className}`}>{message}</p> : null } </>
  )
}