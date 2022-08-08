
import styles from './MainRouteForm.module.css'
import Button from '../Button/Button'
import TextInput from '../TextInput/TextInput'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import H2 from '../H2/H2'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function MainRouteForm({
  mainRoutes,
  setMainRoutes,
}) {

  const [mainRouteFormError, setMainRouteFormError] = useState('')
  const mainRouteForm = useForm()
  const router = useRouter()

  //WHEN WE POST OUR MAIN ROUTE FORM
  const onRouteFormSubmit = async (data) => {
    data.projectId = router.query.id
    const req = await fetch('/api/mainroute/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    setMainRouteFormError(res.error)
    if (res.error === undefined) {
      setMainRoutes(res.data)
    }
  }


  return (
    <form onSubmit={mainRouteForm.handleSubmit(onRouteFormSubmit)} className={styles.form}>
      <H2 text={'Add a Main Route'} className={styles.header} />
      <ErrorMessage message={mainRouteFormError} />
      <TextInput
        placeholder={'Main Route Name'}
        className={styles.input}
        register={mainRouteForm.register('name')}
      />
      <Button
        text={'Create'}
        bg={'var(--main-color)'}
        className={styles.submit}
      />
  </form>
  )
}
