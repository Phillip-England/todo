import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'

import styles from '../../styles/App.module.css'
import authUser from '../../utils/authUser'
import Project from '../../models/projectModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight } from '@fortawesome/free-solid-svg-icons'

import MainLayout from '../../components/MainLayout/MainLayout'
import TextInput from '../../components/TextInput/TextInput'
import Button from '../../components/Button/Button'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Link from 'next/link'

export default function Home({user, projects}) {

  const [projectFormError, setProjectFormError] = useState('')
  const projectForm = useForm()
  const router = useRouter()

  const onCreateProject = async (data) => {
    data.user = user._id
    let req = await fetch('/api/project/create', {
      method: "POST",
      body: JSON.stringify(data)
    })
    let res = await req.json()
    console.log(res)
    setProjectFormError(res.error)
    router.push('/app/home')
  }

  return(
    <main styles={styles.container}>

      <form onSubmit={projectForm.handleSubmit(onCreateProject)} className={styles.form}>
        <h2>Create New Project</h2>
        <ErrorMessage message={projectFormError} />
        <TextInput className={`${styles.input}`} placeholder={'Project Name'} register={projectForm.register('name')} />
        <TextInput className={`${styles.input}`} placeholder={'Vision Statement'} register={projectForm.register('vision')} />
        <Button text={'Create'} type={'submit'} bg={'var(--main-color)'} />
      </form>

      <div className={`${styles.projectContainer}`}>
      {projects.map((project) => 
        <div key={project._id} className={`${styles.projectItem}`}>
          <div className={`${styles.projectItemHeader}`}>
            <h2 className={`${styles.projectName}`}>{project.name}</h2>
            <p className={`${styles.projectVision}`}>{project.vision}</p>
            <Link href={`/app/project/${project._id}`}>
              <FontAwesomeIcon icon={faArrowRight} className={`${styles.projectIcon}`}/> 
            </Link>
          </div>
        </div>
      )}
      </div>

    </main>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout 
      page={page}
      navText={'Welcome Home!'}
    />
  )
}

export async function getServerSideProps(context) {

  //GETTING OUR USER OR REDIRECTING TO LOGIN
  if (await authUser(context) === false) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  } 
  const user = await authUser(context)

  //GETTING ALL OUR USERS PROJECTS
  const projectData = await Project.find({user: user._id})
  const projects = JSON.parse(JSON.stringify(projectData))
  
  return {
    props: {
      user,
      projects
    }
  }
}