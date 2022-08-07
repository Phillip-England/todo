import styles from './Button.module.css'

export default function Button({
  className,
  text,
  type,
  bg,
  onClick,
}) {

  return(
    <button onClick={onClick} className={`${styles.button} ${className}`} type={type} style={{backgroundColor:bg,}}>{text}</button>
  )
}