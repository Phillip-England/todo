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

import sortArrayOfObjects from '../../../utils/sortArrayOfObjects'


export default function MainRoutePage({
  mainRouteData
}) {

  const router = useRouter()
  const [mainRoute, setMainRoute] = useState(mainRouteData[0])
  const [overlay, setOverlay] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)

  const toggleMainRouteUpdateForm = () => {
    setOverlay(!overlay)
    setUpdateForm(!updateForm)
  }

  return (
    <main>
      <Overlay active={overlay} />
      <FixedWindow component={<UpdateMainRouteForm toggleMainRouteUpdateForm={toggleMainRouteUpdateForm} setMainRoute={setMainRoute} mainRoute={mainRoute} onCancel={()=>{toggleMainRouteUpdateForm()}} />} top={'10%'} left={'50%'} active={updateForm} />
      <HeaderAndSubText headerText={mainRoute.name} icon={faPen} onClick={()=>{toggleMainRouteUpdateForm()}} />
      <SubRouteForm setMainRoute={setMainRoute} />
      <SubRouteList mainRoute={mainRoute} />
      <FixedButton onClick={router.back} active={true} top={'90%'} left={'50%'} icon={faArrowLeft} bg={'var(--red)'} />
    </main>
  )
}

MainRoutePage.getLayout = function getLayout(page) {
  return (
    <MainLayout page={page} navText={'Create Your Sub Routes'} />
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
