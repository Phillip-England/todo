import styles from './H4.module.css'

export default function H4({
  text,
  className,
  bg,
}) {

  let jss = {
    color: bg ? bg : 'var(--darkgray)'
  }

  return (
    <h3 className={`${styles.header} ${className}`} style={jss}>{text}</h3>
  )
}
