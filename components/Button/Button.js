import styles from './Button.module.css'

export default function Button({
  className,
  text,
  type,
  bg,
}) {

  return(
    <button className={`${styles.button} ${className}`} type={type} style={{backgroundColor:bg,}}>{text}</button>
  )
}