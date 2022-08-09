import styles from './UpdateMainRouteForm.module.css'
import H2 from '../H2/H2'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import TextInput from '../TextInput/TextInput' 
import Button from '../Button/Button'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import sortArrayOfObjects from '../../utils/sortArrayOfObjects'

export default function UpdateMainRouteForm({
  onCancel,
  mainRoute,
  setMainRoute,
  toggleMainRouteUpdateForm,
}) {

  const form = useForm()
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState('')

  const onFormSubmit = async (data) => {
    data.mainRouteId = mainRoute._id
    const req = await fetch('/api/mainroute/update', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    if (res.error) {
      setError(res.error)
    } else {
      setError('')
      setInputValue('')
      res.data.subRoutes = sortArrayOfObjects(res.data.subRoutes, 'name')
      setMainRoute(res.data)
      toggleMainRouteUpdateForm()
    }
  }

  const onInput = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <form onSubmit={form.handleSubmit((data)=>{onFormSubmit(data)})} className={styles.form}>
      <H2 text={'Update Route Name'} className={styles.header} />
      <ErrorMessage message={error} className={styles.error} />
      <TextInput placeholder={mainRoute.name} onInput={(e)=>{onInput(e)}}  value={inputValue} register={form.register('name')} className={styles.input} />
      <Button text={'Update'} className={styles.submit} />
      <Button text={'Exit'} type={'button'} className={styles.exit} onClick={onCancel} />
    </form>
  )
}
