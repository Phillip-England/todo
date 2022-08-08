import styles from './ProjectNoteList.module.css'
import ProjectNoteItem from '../ProjectNoteItem/ProjectNoteItem'
import H2 from '../H2/H2'
import { useState } from 'react'
import P2 from '../P2/P2'

export default function ProjectNoteList({
  projectNotes,
  setProjectNotes,
}) {

  const deleteNote = async (key) => {
    let copy = Object.assign([], projectNotes)
    let deletedNote
    for (let x = 0; x < copy.length; x++) {
      if (copy[x]._id === key) {
        deletedNote = copy.splice(x, 1)
      }
    }
    let req = await fetch('/api/project/deleteNote', {
      method: 'POST',
      body: JSON.stringify(deletedNote[0])
    })
    let res = await req.json()
    if (res.success) {
      setProjectNotes(copy)
    } else {
      //ERROR FUNCTIONALITY??
    }
  }

  if (projectNotes.length === 0) {
    return (
      <ul className={styles.wrapper}>
        <H2 text={'Note List'} className={styles.header} />
        <P2 text={'Add some notes!'} bg={'var(--main-color)'} />
      </ul>
    )
  } else {
    return (
      <ul className={styles.wrapper}>
        <H2 text={'Note List'} className={styles.header} />
        {projectNotes.map((note) => 
          <ProjectNoteItem note={note} key={note._id} onClick={()=>{deleteNote(note._id)}} />
        )}
      </ul>
    )
  }


}
