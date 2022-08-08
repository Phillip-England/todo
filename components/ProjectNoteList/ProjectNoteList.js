import styles from './ProjectNoteList.module.css'
import ProjectNoteItem from '../ProjectNoteItem/ProjectNoteItem'
import H2 from '../H2/H2'

export default function ProjectNoteList({
  project,
  projectNotes
}) {

  console.log(projectNotes)

  return (
    <ul className={styles.wrapper}>
      <H2 text={'Note List'} className={styles.header} />
      {projectNotes.map((note) => 
        <ProjectNoteItem note={note} key={note._id} />
      )}
    </ul>
  )
}
