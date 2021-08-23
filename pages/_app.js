import '../styles/globals.css'
import '../styles/header.css'
import Layout from '.././components/container/doctor';

function MyApp({ Component, pageProps }) {

  const noLayout = Component.layout == "auth";

  if (noLayout) {
    return (

      <Component {...pageProps}></Component>

    )
  }
  else {
    return (
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    )
  }
}

export default MyApp
