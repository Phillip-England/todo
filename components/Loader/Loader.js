import styles from './Loader.module.css'

export default function Loader({
  className,
  size,
  color,
  width,
}) {

  const jssContainer = {
    height: size,
    width: size,
  }

  const jssLoader = {
    borderTop: `solid ${color} ${width}`,
    height: size,
    width: size,
  }

  return (
    <div style={jssContainer} className={`${styles.container}`}>
      <div style={jssLoader} className={`${styles.loader} ${className}`}></div>
    </div>
  )
}
