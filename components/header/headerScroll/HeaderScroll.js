import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { isAuth,signout } from '../../../actions/auth';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {firebaseService} from '../../../services/firebase-db-service';


function HeaderScroll() {
    const [clicked, setClicked] = useState(false);
    const [logged, setLogged] = useState();
    const [isPatient, setIsPatient] = useState();    
    const [currUser, setCurrUser] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = () => {
        setClicked(!clicked)
    }
    

    useEffect(() => {
        let user = isAuth();
        if (user) {
            setIsPatient(user.roleId =="1");
            setLogged(user);
            var fb = new firebaseService("Users");
            fb.getUserByEmail(user.eMail).then((res)=>{
               let name = res[0].data.name.split(" ")[0];
               let title = `${name}`;
               setCurrUser(title);
            })
            
        }
    }, []);
    
   
    const handleLogout = () => {
        signout( () => {
            Router.push(`/`);
        });
        setAnchorEl(null);
    }

    const handleVisits = () => {
        if(isPatient){
            Router.push(`/visits`);
        }
        else{
            Router.push(`/doctors/visits`);
        }
        
        setAnchorEl(null);
    }

    const handleProfile = () => {
      
        Router.push(`/patients/profile`);
       
        setAnchorEl(null);
    }

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <header className="header_main header_scroll">
            <div className="header_left" >
                <Link href="/"><a><img src="/images/Logo.png" alt="logo"  height="35px"/></a></Link>
                
            </div>
            <div className="header_menu_icon" onClick={handleClick}>
                <i className={clicked ? 'bi bi-x-lg' : 'bi bi-list'}></i>
            </div>


            {logged && 

            <div>
            <Button className="btn-curved" aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="primary" 
              onMouseEnter={handleClickMenu}
              onMouseLeave={handleClickMenu}
            >
            {currUser}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              style={{marginTop:"32px", width:"200px"}}
            >
                {isPatient &&
              <MenuItem onClick={handleProfile}>Profile</MenuItem>        
                }
              <MenuItem onClick={handleVisits}>Visits</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
            
            // (
            //     <ul className={clicked ? 'header_right header_active' : 'header_right'}>
            //         <li className="header_links2"><p className="m-0">{logged.name}</p></li>
            //         {/* <li className="header_links2"><i className="bi bi-chevron-down"></i></li> */}
            //         <li><Link href="/auth/signup" ><button className="btn__signup" onClick={handleLogout}>Logout</button></Link></li>
            //     </ul>
            // )
            
            }
            {!logged && (
                <ul className={clicked ? 'header_right header_active' : 'header_right'}>
                    <li><Link href="/auth/login" ><button className="btn__login">Log in</button></Link></li>
                    <li><Link href="/auth/signup" ><button className="btn__signup">Sign up</button></Link></li>
                </ul>
            )}
        </header>
    )
}

export default HeaderScroll
