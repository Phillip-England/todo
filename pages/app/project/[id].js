import { useState } from 'react'
import { faPen, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Project from '../../../models/projectModel'
import MainRoute from '../../../models/mainRouteModel'

import styles from './[id].module.css'
import MainLayout from '../../../components/MainLayout/MainLayout'
import HeaderAndSubText from "../../../components/HeaderAndSubText/HeaderAndSubText"
import MainRouteForm from "../../../components/MainRouteForm/MainRouteForm"
import MainRouteList from "../../../components/MainRouteList/MainRouteList"
import Overlay from '../../../components/Overlay/Overlay'
import UpdateProjectForm from '../../../components/UpdateProjectForm/UpdateProjectForm'
import FixedButton from '../../../components/FixedButton/FixedButton'
import ProjectNoteForm from '../../../components/ProjectNoteForm/ProjectNoteForm'
import FixedWindow from '../../../components/FixedWindow/FixedWindow'

export default function ProjectPage({
  projectData,
  mainRoutesData
}) {

    const [project, setProject] = useState(projectData)
    const [mainRoutes, setMainRoutes] = useState(mainRoutesData)
    const [overLay, setOverlay] = useState(false)
    const [updateProjectForm, setUpdateProjectForm] = useState(false)
    const [projectNoteForm, setProjectNoteForm] = useState(false)

    const toggleUpdateProjectForm = () => {
      setOverlay(!overLay)
      setUpdateProjectForm(!updateProjectForm)
    }

    const toggleProjectNoteForm = () => {
      setOverlay(!overLay)
      setProjectNoteForm(!projectNoteForm)
    }

  return(
    <main>

      <Overlay active={overLay} />
      <FixedWindow component={<ProjectNoteForm toggleProjectNoteForm={toggleProjectNoteForm} setProject={setProject} project={project} onCancel={()=>{toggleProjectNoteForm()}} />} active={projectNoteForm} top={'10%'} left={'50%'} />
      <FixedWindow component={<UpdateProjectForm project={project} setProject={setProject} toggleUpdateProjectForm={toggleUpdateProjectForm} onCancel={()=>{toggleUpdateProjectForm()}} />} active={updateProjectForm} top={'10%'} left={'50%'} />



      
      <HeaderAndSubText headerText={project.name} subText={project.vision} icon={faPen} onClick={()=>{toggleUpdateProjectForm()}} />
      <MainRouteForm mainRoutes={mainRoutes} setMainRoutes={setMainRoutes} />
      <MainRouteList mainRoutes={mainRoutes} />
      <FixedButton active={true} top={'90%'} left={'30%'} icon={faArrowLeft} />
      <FixedButton onClick={toggleProjectNoteForm} active={true} top={'90%'} left={'70%'} icon={faPlus} />
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