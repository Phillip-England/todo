import styles from './UpdateProjectForm.module.css'
import H2 from '../H2/H2'
import TextInput from '../TextInput/TextInput'
import Button from '../Button/Button'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function UpdateProjectForm({
  active,
  project,
  setProject,
  onCancel,
  toggleUpdateProjectForm,
}) {

  const form = useForm()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    data.project = project
    let req = await fetch('/api/project/update', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    let res = await req.json()
    if (res.error) {
      setError(res.error)
    } else {
      setError('')
      setProject(res.data)
      toggleUpdateProjectForm()
    }
  }

    return (
      <form className={styles.form} onSubmit={form.handleSubmit((data)=>{onSubmit(data)})}>
        <H2 text={`Update ${project.name}`} className={styles.header} />
        <ErrorMessage className={styles.error} message={error} />
        <TextInput placeholder={project.name} register={form.register('name')} defaultValue={project.name} className={styles.nameInput} />
        <TextInput placeholder={project.vision} register={form.register('vision')} defaultValue={project.vision} className={styles.visionInput} />
        <Button text={'Submit'} bg={'var(--main-color)'} className={styles.submit} />
        <Button onClick={onCancel} type={'button'} text={'Cancel'} bg={'var(--main-color)'} className={styles.cancel} />
      </form>
    )

}
