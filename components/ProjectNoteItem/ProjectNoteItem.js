import styles from './ProjectNoteItem.module.css'
import P2 from '../P2/P2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSquare } from '@fortawesome/free-solid-svg-icons'

export default function ProjectNoteItem({
  note,
}) {
  return (
    <li className={styles.wrapper}>
      <P2 text={note.note} />
      <FontAwesomeIcon icon={faSquare} className={styles.icon} />
    </li>
  )
}
