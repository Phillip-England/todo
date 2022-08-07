import styles from './ProjectList.module.css'
import H4 from '../H4/H4'
import P3 from '../P3/P3'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function ProjectList({
  projects
}) {
  return (
    <ul className={`${styles.wrapper}`}>
    {projects.map((project) => 
      <li key={project._id} >
          <H4 text={project.name} className={styles.header}/>
          <P3 text={project.vision} className={styles.text} bg={'var(--main-color)'} />
          <div className={styles.link}>
            <Link href={`/app/project/${project._id}`}>
              <FontAwesomeIcon icon={faArrowRight}/> 
            </Link>
          </div>
      </li>
    )}
    </ul>
  )
}
