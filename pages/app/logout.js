import Loader from '../../components/Loader/Loader'
import styles from '../../styles/Logout.module.css'
import logoutUser from '../../utils/logoutUser'

export default function Logout() {
  return(
    <main className={`${styles.container}`}>
      <h2 className={`${styles.header}`}>Logging Out...</h2>
      <div className={`${styles.loaderContainer}`}>
        <Loader size={50} color={`var(--main-color)`} width={'5px'} />
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  logoutUser(context)
  return {
    redirect: {
      permanent: false,
      destination: '/'
    }
  }
}