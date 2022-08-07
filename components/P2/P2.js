import styles from './P2.module.css'

export default function P2({
  text,
  className,
  bg,
}) {

  let jss = {
    color: bg ? bg : 'var(--darkgray)',
  }

  return (
    <p className={`${styles.text} ${className}`} style={jss}>{text}</p>
  )
}
