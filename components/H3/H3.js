import styles from './H3.module.css'

export default function H3({
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
