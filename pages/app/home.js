import authUser from '../../utils/authUser'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

import Project from '../../models/projectModel'

import styles from '../../styles/App.module.css'
import MainLayout from '../../components/MainLayout/MainLayout'
import CreateProjectForm from '../../components/CreateProjectForm/CreateProjectForm'
import ProjectList from '../../components/ProjectList/ProjectList'
import FixedButton from '../../components/FixedButton/FixedButton'
import Link from 'next/link'

export default function Home({
  user, 
  projectsData
}) {

  const router = useRouter()
  const [projects, setProjects] = useState(projectsData)

  return(
    <main styles={styles.container}>
      <CreateProjectForm user={user} setProjects={setProjects} />
      <ProjectList projects={projects} />
      <FixedButton active={true} top={'90%'} left={'50%'} icon={faDoorOpen} bg={'var(--red)'} href={'/app/logout'} />    
    </main>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout page={page} navText={'Welcome Home!'} />
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
  const projectsFromMongo = await Project.find({user: user._id}).sort({'name': 'ascending'})
  const projectsData = JSON.parse(JSON.stringify(projectsFromMongo))
  
  return {
    props: {
      user,
      projectsData
    }
  }
}