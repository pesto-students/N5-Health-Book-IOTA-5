// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import admin from '../../../firebase/firebaseAdmin'
const db = admin.firestore();
export default async (req, res) => {
  // let id ='1FhkOYiVvUSICpUkRhB6KuribC32'
  let {uid} =req.query
 
    const citiesRef = db.collection('Users');
    const snapshot = await citiesRef.where('uid', '==',uid ).get();
    if (snapshot.empty) {
    console.log('No matching documents.');
    return;
    }  

    snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    });
 

  
}