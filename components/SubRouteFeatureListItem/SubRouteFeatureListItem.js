import styles from './SubRouteFeatureListItem.module.css'
import P4 from '../P4/P4'
import H4 from '../H4/H4'


export default function SubRouteFeatureListItem({
  feature,
}) {
  return (
    <li className={styles.wrapper}>
      <H4 text={feature.name} />
      <P4 text={feature.description} bg={'var(--main-color)'} />
    </li>
  )
}
