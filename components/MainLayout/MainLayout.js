import Navbar from '../Navbar/Navbar'
import Head from 'next/head'
import Spacer from '../Spacer/Spacer'

export default function MainLayout({
  page,
  navText,
}) {
  return(
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <Navbar
        navText={navText}
      />
      <Spacer 
        height={'50px'}
      />
      {page}
    </>
  )
}