import { useRouter } from 'next/router'
import { useState } from 'react'
import { faArrowLeft, faPen } from '@fortawesome/free-solid-svg-icons'

import styles from './[id].module.css'
import MainLayout from '../../../components/MainLayout/MainLayout'
import MainRoute from '../../../models/mainRouteModel'
import HeaderAndSubText from '../../../components/HeaderAndSubText/HeaderAndSubText'
import SubRouteForm from '../../../components/SubRouteForm/SubRouteForm'
import SubRouteList from '../../../components/SubRouteList/SubRouteList'
import FixedButton from '../../../components/FixedButton/FixedButton'
import Overlay from '../../../components/Overlay/Overlay'
import FixedWindow from '../../../components/FixedWindow/FixedWindow'
import UpdateMainRouteForm from '../../../components/UpdateMainRouteForm/UpdateMainRouteForm'
import SubRouteAddFeatureForm from '../../../components/SubRouteAddFeatureForm/SubRouteAddFeatureForm'

import sortArrayOfObjects from '../../../utils/sortArrayOfObjects'


export default function MainRoutePage({
  mainRouteData
}) {

  const router = useRouter()
  const [mainRoute, setMainRoute] = useState(mainRouteData[0])
  const [overlay, setOverlay] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const [addFeatureForm, setAddFeatureForm] = useState(false)
  const [activeSubRoute, setActiveSubRoute] = useState(false)

  const toggleMainRouteUpdateForm = () => {
    setOverlay(!overlay)
    setUpdateForm(!updateForm)
  }

  const toggleAddFeatureForm = () => {
    setOverlay(!overlay)
    setAddFeatureForm(!addFeatureForm)
  }


  return (
    <main>
      <Overlay active={overlay} />
      <FixedWindow component={<UpdateMainRouteForm toggleMainRouteUpdateForm={toggleMainRouteUpdateForm} setMainRoute={setMainRoute} mainRoute={mainRoute} onCancel={()=>{toggleMainRouteUpdateForm()}} />} top={'10%'} left={'50%'} active={updateForm} />
      <FixedWindow component={<SubRouteAddFeatureForm setMainRoute={setMainRoute} mainRoute={mainRoute} toggleAddFeatureForm={toggleAddFeatureForm} activeSubRoute={activeSubRoute} />} top={'10%'} left={'50%'} active={addFeatureForm} />
      <HeaderAndSubText headerText={mainRoute.name} subText={`/${mainRoute.name.toLowerCase()} contians ${mainRoute.subRoutes.length} sub routes`} icon={faPen} onClick={()=>{toggleMainRouteUpdateForm()}} />
      <SubRouteForm setMainRoute={setMainRoute} />
      <SubRouteList mainRoute={mainRoute} setActiveSubRoute={setActiveSubRoute} activeSubRoute={activeSubRoute} toggleAddFeatureForm={toggleAddFeatureForm} />
      <FixedButton onClick={router.back} active={true} top={'90%'} left={'50%'} icon={faArrowLeft} bg={'var(--red)'} />
    </main>
  )
}

MainRoutePage.getLayout = function getLayout(page) {
  return (
    <MainLayout page={page} navText={'Main Route Information'} />
  )
}

export async function getServerSideProps(context) {
  let mainRouteId = context.params.id
  const mainRouteData = await MainRoute.find({_id: mainRouteId})
  mainRouteData[0].subRoutes = sortArrayOfObjects(mainRouteData[0].subRoutes, 'name')

  return({
    props: {
      mainRouteData: JSON.parse(JSON.stringify(mainRouteData))
    }
  })

}
