import styles from './Text.module.css'

export default function Text({
  className,
  text
}) {

  return(
    <p className={`${className} ${styles.text}`}>{text}</p>
  )
}