import Navbar from '../Navbar/Navbar'
import Head from 'next/head'
import Spacer from '../Spacer/Spacer'

export default function MainLayout({
  page
}) {
  return(
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <Navbar/>
      <Spacer 
        height={'50px'}
      />
      {page}
    </>
  )
}