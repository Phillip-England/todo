import H2 from '../H2/H2'
import P3 from '../P3/P3'
import TextInput from '../TextInput/TextInput'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../Button/Button'
import styles from './SubRouteAddFeatureForm.module.css'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function SubRouteAddFeatureForm({
  activeSubRoute,
  toggleAddFeatureForm,
  mainRoute,
  setMainRoute,
}) {

  const form = useForm()
  const [nameValue, setNameValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [error, setError] = useState('')


  const onFormSubmit = async (data) => {
    data.mainRouteId = mainRoute._id
    data.subRouteId = activeSubRoute._id
    const req = await fetch('/api/mainroute/createSubRouteFeature', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    if (res.error) {
      setError(res.error)
    } else {
      setError('')
      setNameValue('')
      setDescriptionValue('')
      setMainRoute(res.data)
      toggleAddFeatureForm()
    }
  }

  const onInput = (e, callback) => {
    callback(e.target.value)
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit((data)=>{onFormSubmit(data)})}>
      <H2 text={'Create a Feature'} className={styles.header} />
      <P3 text={`/${mainRoute.name.toLowerCase()}/${activeSubRoute.name.toLowerCase()}`} bg={'var(--main-color)'} className={styles.subhead} />
      <ErrorMessage message={error} className={styles.error} />
      <TextInput register={form.register('name')} value={nameValue} onInput={(e)=>{onInput(e, setNameValue)}} placeholder={'Feature Name'} className={`${styles.input} ${styles.nameInput}`} />
      <TextInput register={form.register('description')} value={descriptionValue} onInput={(e)=>{onInput(e, setDescriptionValue)}} placeholder={'Feature Description'} className={`${styles.input} ${styles.descriptionInput}`} />
      <Button className={styles.submit} text={'Create'} />
      <Button className={styles.cancel} type={'button'} text={'Exit'} onClick={()=>{toggleAddFeatureForm()}} />

    </form>
  )
}
