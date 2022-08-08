import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import styles from './SubRouteForm.module.css'
import H2 from '../H2/H2'
import TextInput from '../TextInput/TextInput'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../Button/Button'

export default function SubRouteForm({
  mainRoute,
  setSubRoutes,
}) {

  let [errorMessage, setErrorMessage] = useState('')

  let form = useForm()
  let router = useRouter()

  let onFormSubmit = async (data) => {
    data.mainRouteId = router.query.id
    const req = await fetch('/api/subroute/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    if (res.error) {
      setErrorMessage(res.error)
    } else {
      setErrorMessage('')
      setSubRoutes(res.data.subRoutes)

    }
  }

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)} className={styles.form}>
      <H2 text={'Add a Sub Route'} className={styles.header} />
      <ErrorMessage message={errorMessage} />
      <TextInput placeholder={'Sub Route Name'} spellCheck={false} register={form.register('name')} className={styles.input} />
      <Button text={'Create'} bg={'var(--main-color)'} />
    </form>
  )
}
