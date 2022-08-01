import styles from './Header.module.css'

export default function Header({
  className,
  text
}) {

  return(
    <h2 className={`${className} ${styles.header}`}>{text}</h2>
  )
}