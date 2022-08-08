import styles from './ProjectNoteItem.module.css'
import P3 from '../P3/P3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark, faSquare } from '@fortawesome/free-solid-svg-icons'

export default function ProjectNoteItem({
  note,
  onClick,
}) {

  return (
    <li className={styles.wrapper}>
      <P3 text={note.note} />
      <FontAwesomeIcon icon={faSquareXmark} className={styles.icon} onClick={onClick} />
    </li>
  )
}
