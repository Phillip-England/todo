import styles from './SubRouteList.module.css'
import H4 from '../H4/H4'

export default function SubRouteList({
  mainRoute,
  subRoutes
}) {
  return (
    <ul className={`${styles.wrapper}`}>
      {subRoutes.map((subRoute) => 
        <li key={subRoute._id} >
          <H4 text={subRoute.name} />
        </li>     
      )}

    </ul>
  )
}
