import styles from './[id].module.css'
import MainLayout from '../../../components/MainLayout/MainLayout'
import MainRoute from '../../../models/mainRouteModel'
import HeaderAndSubText from '../../../components/HeaderAndSubText/HeaderAndSubText'
import SubRouteForm from '../../../components/SubRouteForm/SubRouteForm'
import SubRouteList from '../../../components/SubRouteList/SubRouteList'
import sortArrayOfObjects from '../../../utils/sortArrayOfObjects'

import { useState } from 'react'

export default function MainRoutePage({
  mainRouteData
}) {

  const [mainRoute, setMainRoute] = useState(mainRouteData)
  const [subRoutes, setSubRoutes] = useState(sortArrayOfObjects(mainRoute[0].subRoutes, 'name'))

  return (
    <main>
      <HeaderAndSubText headerText={mainRoute[0].name} subText={'This main route has many sub routes'} />
      <SubRouteForm mainRoute={mainRoute} />
      <SubRouteList mainRoute={mainRoute} subRoutes={subRoutes} />
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
