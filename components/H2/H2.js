import styles from './H2.module.css'

export default function H2({
  text,
  className,
  bg,
}) {

  let jss = {
    color: bg ? bg : 'var(--darkgray)'
  }

  return (
    <h2 className={`${styles.header} ${className}`} style={jss}>{text}</h2>
  )
}
