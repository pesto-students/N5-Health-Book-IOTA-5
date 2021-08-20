// import LandingPage from "../components/landingPage/LandingPage";
import { isAuth } from '../actions/auth';
import DoctorDash from './../components/doctor/index'
import Patients from './patients/index'
import React, { useState ,useEffect} from 'react'



const Home = () => {
  const [logged, setLogged] = useState();

    useEffect(() => {
        let user = isAuth()
        if (user) {
            setLogged(user)
        }
    }, []);
    
    const renderUserDashboard =(user)=>{
      // return <Patients/>
      console.log(user)
      if(user && user.roleId && user.roleId==2){
        return <DoctorDash/>
      }else{
        return <Patients/>
      }
    }

  
  return (
    <div className="test">
      
      {renderUserDashboard(logged)}
    </div>
  )
}


Home.layout = "dsfdas";
export default Home;
