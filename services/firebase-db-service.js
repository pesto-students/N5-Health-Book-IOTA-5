import firebase from 'firebase'


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    databaseURL: process.env.DATA_BASE_URL,
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);  
}

var dbRef = firebase.database().ref(); 

export class firebaseService {
    constructor(dbName){
    this.name = dbName;
    }

    getAll = () => new Promise((resolve,reject)=>{
      dbRef.child(this.name).once('value', snapshot => {  
        if (snapshot.val() != null) {  
          
          let items = snapshot.val();
         
          let newState = [];
          for (let item in items) {
            newState.push({
              id:item,
              data:items[item]
            });
          }
        resolve(newState);
            
        }  else{
          resolve([]);
        }
    })  
  });

  getById = (id) => new Promise((resolve,reject)=>{
    dbRef.child(`${this.name}/${id}`).once('value', snapshot => {  
      if (snapshot.val() != null) {
        let items = snapshot.val();
       
         let state = { id: id, data: items};
        // for (let item in items) {
        //   newState.push({
        //     id:item,
        //     data:items[item]
        //   });
        // }
      resolve(items);
          
      }  else{
        resolve([]);
      }
  })  
});

getUserByUId = (uid) => new Promise((resolve,reject)=>{
  dbRef.child(this.name).once('value', snapshot => {  
    if (snapshot.val() != null) {  
      let items = snapshot.val();
      
      let newState = [];
      for (let item in items) {
        if(items[item].uid == uid){
        newState.push({
          id:item,
          data:items[item]
        });
      }
      }
    resolve(newState);
        
    }  else{
      resolve([]);
    }
})  
});

getUserByEmail = (eMail) => new Promise((resolve,reject)=>{
  dbRef.child(this.name).once('value', snapshot => {  
    if (snapshot.val() != null) {  
      ;
      let items = snapshot.val();
      
      let newState = [];
      for (let item in items) {
        if(items[item].eMail == eMail){
        newState.push({
          id:item,
          data:items[item]
        });
      }
      }
    resolve(newState);
        
    }  else{
      resolve([]);
    }
})  
});

    

  create = (entity)=>{
    dbRef.child(this.name).push(  
      entity,  
      err => {  
          if (err)  
              console.log(err)
      })
  }
  
  update = (entity, id)=>{
    dbRef.child(`${this.name}/${id}`).set(  
      entity,  
      err => {  
          if (err)  
              console.log(err) 
      })  
    
  }
  
   delete = (id)=>{
    dbRef.child(`${this.name}/${id}`).remove(  
      err => {  
          if (err)  
              console.log(err)
      }) 
  }

  
  
}
