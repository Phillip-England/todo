import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import styles from './MainRouteItem.module.css'
import H4 from '../H4/H4'

export default function MainRouteItem({
  mainRoute,
  active,
  onClick,
}) {

    return (
      <div className={styles.wrapper}>
        <H4 text={mainRoute.name} />
        <Link href={`/app/mainRoute/${mainRoute._id}`}>
          <FontAwesomeIcon icon={faArrowRight} className={`${styles.icon}`}/>
        </Link>
      </div>

    )




}
