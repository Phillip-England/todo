import sortArrayOfObjects from '../../utils/sortArrayOfObjects'

import styles from './ProjectNoteForm.module.css'
import H2 from '../H2/H2'
import TextInput from '../TextInput/TextInput'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Button from '../Button/Button'

import { useState } from 'react'
import { useForm } from 'react-hook-form'


export default function ProjectNoteForm({
  onCancel,
  project,
  setProject,
  toggleProjectNoteForm,
  setProjectNotes
}) {

  const form = useForm()
  const [error, setError] = useState(false)
  const [noteInputValue, setNoteInputValue] = useState('')

  const onSubmit = async (data) => {
    data.project = project
    const req = await fetch('/api/project/createNote', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    if (res.error) {
      console.log(res.error)
      setError(res.error)
    } else {
      setError('')
      setProject(res.data)
      setProjectNotes(sortArrayOfObjects(res.data.notes, 'note'))
      setNoteInputValue('')
      // toggleProjectNoteForm()
    }
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit((data)=>{onSubmit(data)})}>
      <H2 text={'Create A Note'} className={styles.header} />
      <ErrorMessage message={error} className={styles.error} />
      <TextInput onInput={(e)=>{setNoteInputValue(e.target.value)}} value={noteInputValue} placeholder={'Whatcha Thinkin?'} register={form.register('note')} className={styles.input} />
      <Button text={'Create'} bg={'var(--main-color)'} className={styles.submit} />
      <Button text={'Exit'} bg={'var(--red)'} className={styles.cancel} type={'button'} onClick={onCancel} />
    </form>
  )
}
