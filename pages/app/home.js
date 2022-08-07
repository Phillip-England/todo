import styles from '../../styles/App.module.css'
import authUser from '../../utils/authUser'
import Project from '../../models/projectModel'

import MainLayout from '../../components/MainLayout/MainLayout'
import CreateProjectForm from '../../components/CreateProjectForm/CreateProjectForm'
import ProjectList from '../../components/ProjectList/ProjectList'
import { useState } from 'react'

export default function Home({
  user, 
  projectsData
}) {

  const [projects, setProjects] = useState(projectsData)

  return(
    <main styles={styles.container}>
      <CreateProjectForm user={user} setProjects={setProjects} />
      <ProjectList projects={projects} />
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