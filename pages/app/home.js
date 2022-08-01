import { useForm } from 'react-hook-form'
import { useState } from 'react'

import styles from '../../styles/App.module.css'
import getUrl from '../../utils/getUrl'
import authUser from '../../utils/authUser'

import MainLayout from '../../components/MainLayout/MainLayout'
import Header from '../../components/Header/Header'
import Text from '../../components/Text/Text'
import SmallMessage from '../../components/SmallMessage/SmallMessage'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function Home({user}) {

  const [projectFormError, setProjectFormError] = useState('')
  const projectForm = useForm()

  const onCreateProject = async (data) => {
    data.user = user._id
    let req = await fetch('/api/project/create', {
      method: "POST",
      body: JSON.stringify(data)
    })
    let res = await req.json()
    console.log(res)
    setProjectFormError(res.error)
  }

  return(
    <main styles={styles.container}>
      <div className={`${styles.headerContainer}`}>
        <h2>{user.username}</h2>
        <p>Welcome back, staying productive?</p>
      </div>
      <form onSubmit={projectForm.handleSubmit(onCreateProject)} className={styles.form}>
        <h2>Create New Project</h2>
        <ErrorMessage message={projectFormError} />
        <TextInput className={`${styles.input}`} placeholder={'Project Name'} register={projectForm.register('name')} />
        <TextInput className={`${styles.input}`} placeholder={'Vision Statement'} register={projectForm.register('vision')} />
        <Button text={'Create'} type={'submit'} bg={'var(--green)'} />
      </form>
    </main>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout 
      page={page} 
    />
  )
}

export async function getServerSideProps(context) {
  if (await authUser(context) === false) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  } 
  const user = await authUser(context)
  return {
    props: {
      user
    }
  }
}