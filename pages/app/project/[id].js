import { useState } from 'react'

import Project from '../../../models/projectModel'
import MainRoute from '../../../models/mainRouteModel'

import styles from './[id].module.css'
import MainLayout from '../../../components/MainLayout/MainLayout'
import HeaderAndSubText from "../../../components/HeaderAndSubText/HeaderAndSubText"
import MainRouteForm from "../../../components/MainRouteForm/MainRouteForm"
import MainRouteList from "../../../components/MainRouteList/MainRouteList"

export default function ProjectPage({
  projectData,
  mainRoutesData
}) {

    const [mainRoutes, setMainRoutes] = useState(mainRoutesData)

  return(
    <main>
      <HeaderAndSubText headerText={projectData.name} subText={projectData.vision} />
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