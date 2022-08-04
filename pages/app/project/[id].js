import getUrl from '../../../utils/getUrl'
import Project from '../../../models/projectModel'
import SubRoute from '../../../models/subRouteModel'
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
  subRoutes,
}) {

  //PULLING IN LIBRARIES
  const router = useRouter()
  const routeForm = useForm()

  //EACH MAINROUTE WILL NEED ITS OWN USEFORM()
  //EACH MAINROUTE WILL ALSO NEED SUBROUTES
  for (let x = 0; x < mainRoutes.length; x++) {
    mainRoutes[x].form = useForm()
    mainRoutes[x].subRoutes = subRoutes[x]
  }

  console.log(mainRoutes)

  //SETTING UP STATE
  const [routeFormError, setRouteFormError] = useState('')
  const [mainRouteSection, setMainRouteSection] = useState(mainRoutes)


  //TO HELP FORMAT OUR ROUTES AS YOU TYPE
  const formatRouteInput = (e) => {
    //ALWAYS OVERWRITE POSITION '0' with '/'
    if (e.target.value[0] !== '/') {
      e.target.value = `/${e.target.value}`
    }
  }

  //TO HELP FORMAT SUBROUTE INPUTS AS USER TYPES
  const formatSubRouteInput = (e, mainRouteName) => {
    if ( (e.target.value.length-1) < mainRouteName.length) {
      e.target.value = `${mainRouteName}/`
    }
  }

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
  const onSubRouteFormSubmit = async (data, key) => {
    data.projectId = router.query.id
    data.mainRouteId = key
    console.log(data)
    const req = await fetch('/api/subroute/create', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    const res = await req.json()
    getSubRouteFormError(res.error, data.mainRouteId)
    //GET THE USE FORM FOR THE CURRENT SUBROUTE
    for (let x = 0; x < mainRouteSection.length; x++) {
      if (mainRouteSection[x]._id === data.mainRouteId) {
        mainRouteSection[x].form.setValue('name', '')
      }
    }
  }

  //DISPLAYS FORM ERRORS ON PROPER SUBROUTE FORM
  const getSubRouteFormError = (error, key) => {
    let copy = Object.assign([], mainRouteSection)
    for (let x = 0; x < copy.length; x++) {
      if (copy[x]._id === key) {
        copy[x].error = error
      } else {
        copy[x].error = ''
      }
    }
    setMainRouteSection(copy)
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
        {Object.keys(mainRouteSection).map((key) => 

          <div className={styles.routeWrapper}>
            <div className={styles.mainRouteWrapper} key={mainRouteSection[key]._id}>
              <form className={styles.subrouteForm} onSubmit={mainRouteSection[key].form.handleSubmit((data) => {onSubRouteFormSubmit(data, mainRouteSection[key]._id)})}>
                <h2 className={styles.mainRouteName}>{mainRouteSection[key].name}</h2>
                <ErorrMessage message={mainRouteSection[key].error} className={styles.subRouteFormError} />
                <input {...mainRouteSection[key].form.register('name')} autoComplete={'off'} spellCheck={'false'} placeholder='Subroute name (ex. "/api/user/auth")' className={styles.subrouteInput} onClick={(e)=>{formatSubRouteInput(e, mainRouteSection[key].name)}} />
                <button className={styles.subrouteSubmit}>+</button>
              </form>
            </div>

            <div className={styles.subRouteSection}>
              {mainRouteSection[key].subRoutes.map((subRoute) =>
                <div className={styles.subRouteWrapper} key={subRoute._id}>
                  <p className={styles.subRouteName}>{subRoute.name}</p>
                </div>
              )}
            </div>

          </div>

          
        )}
      </div>


    </main>


  )
}

//SETTING UP LAYOUT
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
  let mainRouteData = await MainRoute.find({project: projectId}).sort({name:'ascending'})

  //WE WILL EXPORT THIS AS OUR SUBROUTES
  let subRouteExport = []

  //EACH MAIN ROUTE WILL NEED ITS SUBROUTES
  for (let x = 0; x < mainRouteData.length; x++) {
    let associatedSubRoutes = await SubRoute.find({mainRoute: mainRouteData[x]._id}).sort({name:'ascending'})
    subRouteExport.push(associatedSubRoutes)
  }

  //FORMATTING THE DATA
  let project = JSON.parse(JSON.stringify(projectData[0]))
  let mainRoutes = JSON.parse(JSON.stringify(mainRouteData))
  let subRoutes = JSON.parse(JSON.stringify(subRouteExport))

  //SENDING DATA TO CLIENT
  return {
    props: {
      project,
      mainRoutes,
      subRoutes,
    }
  }
  
}