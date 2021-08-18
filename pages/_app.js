import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/header.css'
// import '../styles/dashboard.css'
import Layout from '.././components/container/doctor';

// const layouts = {
//   doctor: DocLayout,
//   patient: PatientLayout,
// };

function MyApp({ Component, pageProps }) {
 debugger;
  const noLayout = Component.layout == "auth";
  // const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
 
  if(noLayout){
    return(  

       <Component {...pageProps}></Component>

     )
  }
  else{
    return(
      <Layout> 
    <Component {...pageProps}></Component>
    </Layout>    
    )
  } 
}

export default MyApp
