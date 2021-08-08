import LandingPage from "../components/landingPage/LandingPage";
import { isAuth } from '../actions/auth';
import DoctorDash from './doctors/index'
import Patients from './patients/index'
import React, { useState ,useEffect} from 'react'

export default function Home() {
  const [logged, setLogged] = useState();

    useEffect(() => {
        let user = isAuth()
        if (user) {
            setLogged(user)
        }
    }, []);

    const renderUserDashboard =(user)=>{
      // return <Patients/>
      if(user && user.rollId && user.rollId==2){
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
