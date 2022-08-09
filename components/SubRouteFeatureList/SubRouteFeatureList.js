import styles from './SubRouteFeatureList.module.css'
import SubRouteFeatureListItem from '../SubRouteFeatureListItem/SubRouteFeatureListItem'

export default function SubRouteFeatureList({
  mainRoute,
  subRoute,
}) {
  return (
    <ul className={styles.wrapper}>
      {subRoute.features.map((feature) =>
        <SubRouteFeatureListItem feature={feature} />
      )}
    </ul>
  )
}
