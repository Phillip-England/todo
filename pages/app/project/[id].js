import getUrl from '../../../utils/getUrl'
import Project from '../../../models/projectModel'
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
import MainRoute from '../../../models/mainRouteModel'

export default function ProjectPage({
  project,
  mainRoutes,
}) {

  //PULLING IN LIBRARIES
  const router = useRouter()
  const routeForm = useForm()
  const subRouteForm = useForm()

  //SETTING UP STATE
  const [routeFormError, setRouteFormError] = useState('')
  const [subRouteFormError, setSubRouteFormError] = useState('')

  //TO HELP FORMAT OUR ROUTES AS YOU TYPE
  const formatRouteInput = (e) => {
    //ALWAYS OVERWRITE POSITION '0' with '/'
    if (e.target.value[0] !== '/') {
      e.target.value = `/${e.target.value}`
    }
  }

  //TO HELP FORMAT SUBROUTE INPUTS AS USER TYPES

  //WHEN WE POST OUR MAIN ROUTE FORM
  const onRouteFormSubmit = async (data) => {
    data.projectId = router.query.id
    const req = await fetch('/api/mainroute/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    setRouteFormError(res.error)
    if (res.redirect) {
      router.push(res.redirect)
    }
  }

  //WHEN WE POST OUR SUB ROUTE FORM
  const onSubRouteFormSubmit = async (data) => {
    data.projectId = router.query.id
    console.log(data)
    const req = await fetch('/api/subroute/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    console.log(res)
    setSubRouteFormError(res.error)
    if (res.redirect) {
      router.push(res.redirect)
    }
  }

  return(
    <main>

      <div className={styles.headerContainer}>
        <h2 className={styles.name}>{project.name}</h2>
        <p className={styles.vision}>{project.vision}</p>
        <FontAwesomeIcon icon={faGear} className={styles.settings} />
      </div>

      <form onSubmit={routeForm.handleSubmit(onRouteFormSubmit)} className={styles.routeForm}>
        <h2 className={styles.routeHeader}>Add a Main Route</h2>
        <ErorrMessage message={routeFormError} />
        <TextInput
          placeholder={'Main route name (ex. "/user" or "/invoice/:id")'}
          className={styles.routeInput}
          register={routeForm.register('name')}
          onInput={(e)=>{formatRouteInput(e)}}
        />
        <Button
          text={'Create'}
          bg={'var(--main-color)'}
          className={styles.routeSubmit}
        />
      </form>

      <div className={styles.routeSectionWrapper}>
        {Object.keys(mainRoutes).map((key) => 
          <div className={styles.mainRouteWrapper} key={mainRoutes[key]._id}>
            <form className={styles.subrouteForm} onSubmit={subRouteForm.handleSubmit((data)=>{onSubRouteFormSubmit(data)})}>
              <h2 className={styles.mainRouteName}>{mainRoutes[key].name}</h2>
              <input {...subRouteForm.register('name')} placeholder='Subroute name (ex. "/api/user/auth")' className={styles.subrouteInput} />
              <button className={styles.subrouteSubmit}>+</button>
            </form>
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

  //GETTING THE CURRENT PROJECT
  let projectData = await Project.find({_id: projectId})

  //GETTING MAIN ROUTES
  let mainRouteData = await MainRoute.find({project: projectId})

  //FORMATTING THE DATA
  let project = JSON.parse(JSON.stringify(projectData[0]))
  let mainRoutes = JSON.parse(JSON.stringify(mainRouteData))

  //SENDING DATA TO CLIENT
  return {
    props: {
      project,
      mainRoutes,
    }
  }
  
}