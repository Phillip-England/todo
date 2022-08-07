import styles from './Overlay.module.css'

export default function Overlay({
  active
}) {
  if (active === true) {
    return (
      <div className={styles.overlay}></div>
    )
  } else {
    return null
  }

}
