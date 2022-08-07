import { useState } from 'react'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import Project from '../../../models/projectModel'
import MainRoute from '../../../models/mainRouteModel'

import styles from './[id].module.css'
import MainLayout from '../../../components/MainLayout/MainLayout'
import HeaderAndSubText from "../../../components/HeaderAndSubText/HeaderAndSubText"
import MainRouteForm from "../../../components/MainRouteForm/MainRouteForm"
import MainRouteList from "../../../components/MainRouteList/MainRouteList"
import Overlay from '../../../components/Overlay/Overlay'
import UpdateProjectForm from '../../../components/UpdateProjectForm/UpdateProjectForm'

export default function ProjectPage({
  projectData,
  mainRoutesData
}) {

    const [project, setProject] = useState(projectData)
    const [mainRoutes, setMainRoutes] = useState(mainRoutesData)
    const [overLay, setOverlay] = useState(false)
    const [updateProjectForm, setUpdateProjectForm] = useState(false)

    const toggleUpdateProjectForm = () => {
      setOverlay(!overLay)
      setUpdateProjectForm(!updateProjectForm)
    }

  return(
    <main>
      <Overlay active={overLay} />
      <UpdateProjectForm active={updateProjectForm} project={project} setProject={setProject} toggleUpdateProjectForm={toggleUpdateProjectForm} onCancel={()=>{toggleUpdateProjectForm()}} />
      <HeaderAndSubText headerText={project.name} subText={project.vision} icon={faPen} onClick={()=>{toggleUpdateProjectForm()}} />
      <MainRouteForm mainRoutes={mainRoutes} setMainRoutes={setMainRoutes} />
      <MainRouteList mainRoutes={mainRoutes} />
    </main>


  )
}

ProjectPage.getLayout = function getLayout(page) {
  return (
    <MainLayout page={page} navText={'Create Your Main Routes'} />
  )
}

export async function getServerSideProps(context) {

  let projectId = context.params.id
  let project = await Project.find({_id: projectId})
  let mainRoutes = await MainRoute.find({project: projectId}).sort({name:'ascending'})
  let projectData = JSON.parse(JSON.stringify(project[0]))
  let mainRoutesData = JSON.parse(JSON.stringify(mainRoutes))

  return {
    props: {
      projectData,
      mainRoutesData,
    }
  }
  
}