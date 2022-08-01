import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  //Pulling method added to any Page Component
  const getLayout = Component.getLayout || ((page) => page)

  //Using the function provided from the page compnent to apply layout
  return getLayout(<Component {...pageProps} />)

}

export default MyApp
