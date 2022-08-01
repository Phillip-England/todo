import Navbar from '../Navbar/Navbar'
import Head from 'next/head'
import Script from 'next/script'

export default function MainLayout({
  page
}) {
  return(
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <Navbar/>
      {page}
    </>
  )
}