import { useState } from 'react'
import { faPen, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

import Project from '../../../models/projectModel'
import MainRoute from '../../../models/mainRouteModel'

import sortArrayOfObjects from '../../../utils/sortArrayOfObjects'
import addStatefulProp from '../../../utils/addStatefulProp'

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
import ProjectNoteList from '../../../components/ProjectNoteList/ProjectNoteList'

export default function ProjectPage({
  projectData,
  mainRoutesData
}) {

    const router = useRouter()
    const [project, setProject] = useState(projectData)
    const [projectNotes, setProjectNotes] = useState(addStatefulProp(sortArrayOfObjects(project.notes, 'note'), 'active'))
    const [mainRoutes, setMainRoutes] = useState(mainRoutesData)
    const [overLay, setOverlay] = useState(false)
    const [updateProjectForm, setUpdateProjectForm] = useState(false)
    const [projectNoteForm, setProjectNoteForm] = useState(false)
    const [projectNoteList, setProjectNoteList] = useState(false)


    const toggleUpdateProjectForm = () => {
      setOverlay(!overLay)
      setUpdateProjectForm(!updateProjectForm)
    }

    const toggleProjectNoteForm = () => {
      setOverlay(!overLay)
      setProjectNoteForm(!projectNoteForm)
      setProjectNoteList(!projectNoteList)
    }


  return(

    <main>
      <Overlay active={overLay} />
      <FixedWindow component={<ProjectNoteForm setProjectNotes={setProjectNotes} toggleProjectNoteForm={toggleProjectNoteForm} setProject={setProject} project={project} onCancel={()=>{toggleProjectNoteForm()}} />} active={projectNoteForm} top={'10%'} left={'50%'} />
      <FixedWindow component={<UpdateProjectForm project={project} setProject={setProject} toggleUpdateProjectForm={toggleUpdateProjectForm} onCancel={()=>{toggleUpdateProjectForm()}} />} active={updateProjectForm} top={'10%'} left={'50%'} />
      <FixedWindow component={<ProjectNoteList setProjectNotes={setProjectNotes} projectNotes={projectNotes} />} top={'30%'} left={'50%'} active={projectNoteList} />
      <HeaderAndSubText headerText={project.name} subText={project.vision} icon={faPen} onClick={()=>{toggleUpdateProjectForm()}} />
      <MainRouteForm mainRoutes={mainRoutes} setMainRoutes={setMainRoutes} />
      <MainRouteList mainRoutes={mainRoutes} />
      <FixedButton onClick={router.back} active={true} top={'90%'} left={'30%'} icon={faArrowLeft} bg={'var(--red)'} />
      <FixedButton onClick={toggleProjectNoteForm} active={true} top={'90%'} left={'70%'} icon={faPlus} text={projectNotes} />
    </main>


  )
}

ProjectPage.getLayout = function getLayout(page) {
  return (
    <MainLayout page={page} navText={'Project Information'} />
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