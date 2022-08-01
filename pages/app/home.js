import styles from '../../styles/App.module.css'
import getUrl from '../../utils/getUrl'
import authUser from '../../utils/authUser'
import MainLayout from '../../components/MainLayout/MainLayout'
import Header from '../../components/Header/Header'
import Text from '../../components/Text/Text'
import SmallMessage from '../../components/SmallMessage/SmallMessage'

export default function Home({user}) {
  return(
    <main styles={styles.container}>
      <SmallMessage header={user.username} text={'Welcome back, staying productive?'} className={styles.mainMessage} />
    </main>
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