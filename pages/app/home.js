import getUrl from '../../utils/getUrl'
import authUser from '../../utils/authUser'
import MainLayout from '../../components/MainLayout/MainLayout'

export default function Home({user}) {
  return(
    <h1>{user.username}</h1>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout 
      page={page} 
    />
  )
}

export async function getServerSideProps(context) {
  if (await authUser(context) === false) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  } 
  const user = await authUser(context)
  return {
    props: {
      user
    }
  }
}