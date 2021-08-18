import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/header.css'
// import '../styles/dashboard.css'
import DocLayout from '.././components/container/doctor';
import PatientLayout from '.././components/container/patient';
import {isAuth} from '../actions/auth';

const layouts = {
  doctor: DocLayout,
  patient: PatientLayout,
};

function MyApp({ Component, pageProps }) {
 debugger;
  const currLayout = layouts[Component.layout];
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
 
  if(currLayout){
    return(    
      <Layout> 
       <Component {...pageProps}></Component>
     </Layout>     
     )
  }
  else{
    return(
    <Component {...pageProps}></Component>
    )
  } 
}

export default MyApp
