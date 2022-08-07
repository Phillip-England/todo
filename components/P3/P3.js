import styles from './P3.module.css'

export default function P3({
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
