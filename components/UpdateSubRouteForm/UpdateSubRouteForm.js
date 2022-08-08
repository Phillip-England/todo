import styles from './UpdateSubRouteForm.module.css'
import H2 from '../H2/H2'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import TextInput from '../TextInput/TextInput' 

import { useState } from 'react'
import Button from '../Button/Button'

export default function UpdateSubRouteForm({
  onCancel,
}) {

  const [error, setError] = useState('')

  return (
    <form className={styles.form}>
      <H2 text={'Update Route Name'} className={styles.header} />
      <ErrorMessage message={error} className={styles.error} />
      <TextInput className={styles.input} />
      <Button text={'Update'} className={styles.submit} />
      <Button text={'Exit'} type={'button'} className={styles.exit} onClick={onCancel} />
    </form>
  )
}
