import {firebaseService} from './firebase-db-service';

export const GetAllPatients = async () => {
    var patients = [];
    var fb = new firebaseService("Users");
    await fb.getAll().then((values)=>{
       
        patients = values.filter(a=>a.data.roleId == "1").map(item => {
            const container = {};
        
            container.uid = item.data.uid;
            container.name = item.data.name;
        
            return container;
        })
        
    });
    return patients;
}

export const GetPatientsByMobile = async (mobile) => {
    var uids = [];
  
    var fb = new firebaseService("Users");
    await fb.getAll().then((values)=>{
 
        uids = values.filter(a=>a.data.mobileNum == mobile ).map(item => {
            const container = {};
        
            container.uid = item.data.uid;            
        
            return container;
        })        
    });

    
    
    return uids;
}