import styles from './SubRouteForm.module.css'

export default function SubRouteForm() {
  return (
    <form className={styles.form}>
      <h1 className={styles.header}>Create a Sub Route</h1>
      <input className={styles.input}/>
      <div className={styles.buttons}>
        <button className={`${styles.create} ${styles.button}`}>Create</button>
        <button className={`${styles.cancel} ${styles.button}`} type='button' >Cancel</button>
      </div>
    </form>
  )
}
