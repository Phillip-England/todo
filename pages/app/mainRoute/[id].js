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
import UpdateSubRouteForm from '../../../components/UpdateSubRouteForm/UpdateSubRouteForm'

import sortArrayOfObjects from '../../../utils/sortArrayOfObjects'


export default function MainRoutePage({
  mainRouteData
}) {

  const router = useRouter()
  const [mainRoute, setMainRoute] = useState(mainRouteData)
  const [subRoutes, setSubRoutes] = useState(sortArrayOfObjects(mainRoute[0].subRoutes, 'name'))
  const [overlay, setOverlay] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)

  const toggleSubRouteUpdateForm = () => {
    setOverlay(!overlay)
    setUpdateForm(!updateForm)
  }

  return (
    <main>
      <Overlay active={overlay} />
      <FixedWindow component={<UpdateSubRouteForm onCancel={()=>{toggleSubRouteUpdateForm()}} />} top={'10%'} left={'50%'} active={updateForm} />

      <HeaderAndSubText headerText={mainRoute[0].name} icon={faPen} onClick={()=>{toggleSubRouteUpdateForm()}} />
      <SubRouteForm setSubRoutes={setSubRoutes} mainRoute={mainRoute} />
      <SubRouteList mainRoute={mainRoute} subRoutes={subRoutes} />
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
  return({
    props: {
      mainRouteData: JSON.parse(JSON.stringify(mainRouteData))
    }
  })

}
