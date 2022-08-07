import styles from '../../styles/App.module.css'
import authUser from '../../utils/authUser'
import Project from '../../models/projectModel'

import MainLayout from '../../components/MainLayout/MainLayout'
import CreateProjectForm from '../../components/CreateProjectForm/CreateProjectForm'
import ProjectList from '../../components/ProjectList/ProjectList'

export default function Home({
  user, 
  projects
}) {
  return(
    <main styles={styles.container}>
      <CreateProjectForm user={user} />
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
  const projectData = await Project.find({user: user._id})
  const projects = JSON.parse(JSON.stringify(projectData))
  
  return {
    props: {
      user,
      projects
    }
  }
}