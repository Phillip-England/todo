import { useState } from 'react'

import styles from './MainRouteList.module.css'
import MainRouteItem from '../MainRouteItem/MainRouteItem'

export default function MainRouteList({
  mainRoutes,
}) {

  return (
    <div className={styles.wrapper}>
        {mainRoutes.map((mainRoute) => 
          <MainRouteItem key={mainRoute._id} mainRoute={mainRoute} />
        )}
    </div>
  )
}
