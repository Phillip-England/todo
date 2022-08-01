import styles from './HeaderSm.module.css'

export default function HeaderSm({
  className,
  text
}) {

  return(
    <h3 className={`${className} ${styles.header}`}>{text}</h3>
  )
}