import styles from './P4.module.css'

export default function P4({
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
