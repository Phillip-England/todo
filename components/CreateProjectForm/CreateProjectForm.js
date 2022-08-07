import styles from './CreateProjectForm.module.css'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import TextInput from '../TextInput/TextInput'
import Button from '../Button/Button'
import H2 from '../H2/H2'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

import sortArrayOfObjects from '../../utils/sortArrayOfObjects'

export default function CreateProjectForm({
  user,
  setProjects
}) {

  const [projectFormError, setProjectFormError] = useState('')
  const projectForm = useForm()

  const onCreateProject = async (data) => {
    data.user = user._id
    let req = await fetch('/api/project/create', {
      method: "POST",
      body: JSON.stringify(data)
    })
    let res = await req.json()
    if (res.error) {
      setProjectFormError(res.error)
    } else {
      setProjects(sortArrayOfObjects(res.data, 'name'))
    }
  }

  return (
    <form onSubmit={projectForm.handleSubmit(onCreateProject)} className={styles.form}>
      <H2 text={'Create New Project'} className={styles.header}/>
      <ErrorMessage message={projectFormError} />
      <TextInput className={`${styles.input}`} placeholder={'Project Name'} register={projectForm.register('name')} />
      <TextInput className={`${styles.input}`} placeholder={'Vision Statement'} register={projectForm.register('vision')} />
      <Button text={'Create'} type={'submit'} bg={'var(--main-color)'} />
    </form>
  )
}

