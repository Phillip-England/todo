import styles from './SubRouteList.module.css'
import SubRouteListItem from '../SubRouteListItem/SubRouteListItem'

export default function SubRouteList({
  mainRoute,
  toggleAddFeatureForm,
  activeSubRoute,
  setActiveSubRoute,
}) {
  return (
    <ul className={`${styles.wrapper}`}>
      {mainRoute.subRoutes.map((subRoute) => 
        <SubRouteListItem className={styles.listItem} key={subRoute._id} setActiveSubRoute={setActiveSubRoute} activeSubRoute={activeSubRoute} subRoute={subRoute} mainRoute={mainRoute} toggleAddFeatureForm={toggleAddFeatureForm} />
      )}

    </ul>
  )
}
