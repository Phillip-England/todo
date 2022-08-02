import getUrl from '../../../utils/getUrl'
import Project from '../../../models/projectModel'
import Feature from '../../../models/featureModel'
import MainLayout from '../../../components/MainLayout/MainLayout'
import styles from './[id].module.css'
import { useRouter } from "next/router"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import TextInput from '../../../components/TextInput/TextInput'
import Button from '../../../components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCaretDown, faCaretUp, faPlus } from '@fortawesome/free-solid-svg-icons'
import ErorrMessage from '../../../components/ErrorMessage/ErrorMessage'

export default function ProjectPage({
  project,
  features,
}) {

  //PULLING IN LIBRARIES
  const router = useRouter()
  const featureForm = useForm()
  const noteForm = useForm()

  //SETTING UP STATE
  const [featureFormError, setFeatureFormError] = useState('')
  const [featureMenu, setFeatureMenu] = useState(false)
  const [featureItems, setFeatureItems] = useState(features)
  const [noteFormError, setNoteFormError] = useState('Time to brainstorm!')

  //WHEN WE POST OUR FEATURE FORM
  const onFeatureFormSubmit = async (data) => {
    data.projectId = router.query.id
    const req = await fetch('/api/feature/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    setFeatureFormError(res.error)
    if (res.redirect) {
      router.push(res.redirect)
    }
  }

  //WHEN WE POST OUR NOTE FORM
  const onNoteFormSubmit = async (data, feature) => {
    data.featureId = feature
    const req = await fetch('/api/note/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    console.log(res)
    setNoteFormError(res.error)
  }

  //TOGGLING OUR FEATURE MENUS
  const toggleFeatureMenu = (key) => {
    let copy = Object.assign([], featureItems)
    copy.map((feature) => {
      if (feature._id === key) {
        feature.active = !feature.active
      } else {
        feature.active = false
      }
    })
    setFeatureItems(copy)
  }

  return(
    <main>

      <div className={styles.headerContainer}>
        <h2 className={styles.name}>{project.name}</h2>
        <p className={styles.vision}>{project.vision}</p>
        <FontAwesomeIcon icon={faGear} className={styles.settings} />
      </div>

      <form onSubmit={featureForm.handleSubmit(onFeatureFormSubmit)} className={styles.featureForm}>
        <h2 className={styles.featureHeader}>Add a Feature</h2>
        <ErorrMessage message={featureFormError} />
        <TextInput
          placeholder={'Feature Name'}
          className={styles.featureInput}
          register={featureForm.register('name')}
        />
        <Button
          text={'Create'}
          bg={'var(--green)'}
          className={styles.freatureSubmit}
        />
      </form>

      <div className={styles.features}>
        {featureItems.map((feature) =>
          <div key={feature._id} className={feature.active ? `${styles.featureContainer} ${styles.featureContainerActive}` : styles.featureContainer}>
            <div className={feature.active ? `${styles.featureHeader} ${styles.featureHeaderActive}` : `${styles.featureHeader}`} onClick={()=>{toggleFeatureMenu(feature._id)}}>
              <h2 className={feature.active ? `${styles.featureName} ${styles.featureNameActive}` : `${styles.featureName}`}>{feature.name}</h2>
              {feature.active
                ? <FontAwesomeIcon icon={faCaretDown} className={`${styles.featureCaret} ${styles.featureCaretActive}`} />
                : <FontAwesomeIcon icon={faCaretUp} className={styles.featureCaret} />
              }
            </div>
            {feature.active
              ?
                <div className={styles.featureHiddenContainer}>
                  
                  <form className={styles.noteForm} onSubmit={noteForm.handleSubmit((data)=>{onNoteFormSubmit(data, feature._id)})}>
                    <input {...noteForm.register('details')} className={styles.noteFormInput} placeholder={'Time to brainstorm!'} />
                    <button className={styles.noteFormSubmit}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </form>

                  <ErorrMessage message={noteFormError} />

                </div>
              : null
            }
          </div> 
        )}

      </div>

    </main>


  )
}

ProjectPage.getLayout = function getLayout(page) {
  return (
    <MainLayout 
      page={page} 
    />
  )
}

export async function getServerSideProps(context) {

  //GETTING REQ AND RES FROM CONTEXT
  const {req, res} = context

  //OUR URL PARAM
  let projectId = context.params.id

  //GETTING THE CURRENT PROJECT AND ITS FEATURES
  let projectData = await Project.find({_id: projectId})
  let featureData = await Feature.find({project: projectId})

  //FORMATTING THE DATA
  let features = JSON.parse(JSON.stringify(featureData))
  let project = JSON.parse(JSON.stringify(projectData[0]))

  //FEATURES NEEDS ADDTIONAL PARAMETERS FOR STATE
  features.map((feature) => {
    feature.active = false
  })

  //SENDING DATA TO CLIENT
  return {
    props: {
      project,
      features
    }
  }
  
}