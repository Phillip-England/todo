import styles from './FixedWindow.module.css'

export default function FixedWindow({
  component,
  active,
  top,
  left,
  bg
}) {

  let jss = {
    top: top,
    left: left,
    backgroundColor: bg,
  }

  if (active) {
    return (
      <div className={styles.wrapper} style={jss}>
        {component}
      </div>
    )
  } else {
    return null
  }


}
