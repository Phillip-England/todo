import { useRouter } from "next/router"
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faCaretDown, faCaretUp, faPlus, faCircle, faArrowAltCircleRight, } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

import Project from '../../../models/projectModel'
import SubRoute from '../../../models/subRouteModel'
import MainRoute from '../../../models/mainRouteModel'

import getFormValues from '../../../utils/getFormChildren'
import formError from '../../../utils/formError'
import getUrl from '../../../utils/getUrl'

import styles from './[id].module.css'
import MainLayout from '../../../components/MainLayout/MainLayout'
import TextInput from '../../../components/TextInput/TextInput'
import Button from '../../../components/Button/Button'
import ErorrMessage from '../../../components/ErrorMessage/ErrorMessage'

//ISSUES
// - need to sort new main routes as they come in. will need to sort by .name parameter
// - need the subroute forms to error on repeated // characters


export default function ProjectPage({
  project,
  mainRoutes,
  subRoutes,
}) {

  //PULLING IN LIBRARIES
  const router = useRouter()
  const routeForm = useForm()

  //SETTING UP STATE
  const [routeFormError, setRouteFormError] = useState('')
  const [mainRouteSection, setMainRouteSection] = useState(mainRoutes)
  const [subRouteSection, setSubRouteSection] = useState(subRoutes)


  //TO HELP FORMAT OUR ROUTES AS YOU TYPE
  const formatRouteInput = (e) => {
    //ALWAYS OVERWRITE POSITION '0' with '/'
    if (e.target.value[0] !== '/') {
      e.target.value = `/${e.target.value}`
    }
  }

  //TO HELP FORMAT SUBROUTE INPUTS AS USER TYPES
  const formatSubRouteInput = (e, mainRouteName) => {
    //FORMATTING
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
    if (res.error === undefined) {
      let copy = Object.assign([], mainRouteSection)
      copy.push(res.data)
      setMainRouteSection(copy)
    }
  }

  //WHEN WE POST OUR SUB ROUTE FORMS
  const onSubRouteFormSubmit = async (e, mainRoute) => {
    e.preventDefault()
    let data = getFormValues(e.target)
    let req = await fetch('/api/subroute/create', {
      method: 'POST',
      body: JSON.stringify({
        name: data[0].value,
        projectId: mainRoute.project,
        mainRouteId: mainRoute._id,
      }),
    })
    let res = await req.json()
    formError(e.target, res.error)
    if (res.error === undefined) {
      let copy = Object.assign([], subRouteSection)
      copy.push(res.data)
      setSubRouteSection(copy)
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

          <div className={styles.routeWrapper} key={mainRouteSection[key]._id}>
            <div className={styles.mainRouteHeader}>
              <h2 className={styles.mainRouteName}>{mainRouteSection[key].name}</h2>
              <Link href={`/app/form/createSubRoute/${mainRouteSection[key]._id}`}>
                <FontAwesomeIcon icon={faPlus} className={styles.mainRoutePlus} />
              </Link>
            </div>
            <div className={styles.subRouteSection}>
              {Object.keys(subRouteSection).map((subkey) =>
                {
                  if (subRouteSection[subkey].mainRoute === mainRouteSection[key]._id) {
                    return(
                      <div className={styles.subRouteWrapper} key={subRouteSection[subkey]._id}>
                        <p className={styles.subRouteName}>{subRouteSection[subkey].name}</p>
                        <FontAwesomeIcon icon={faArrowAltCircleRight} className={styles.arrowIcon} />
                      </div>
                    )
                  }
                }
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
      navText={'Main Routes'}
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
  let subRouteData = await SubRoute.find({project: projectId})

  //FORMATTING THE DATA
  let project = JSON.parse(JSON.stringify(projectData[0]))
  let mainRoutes = JSON.parse(JSON.stringify(mainRouteData))
  let subRoutes = JSON.parse(JSON.stringify(subRouteData))

  //SENDING DATA TO CLIENT
  return {
    props: {
      project,
      mainRoutes,
      subRoutes,
    }
  }
  
}