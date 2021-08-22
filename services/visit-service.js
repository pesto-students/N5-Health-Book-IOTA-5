import {firebaseService} from './firebase-db-service';


export const RemoveReportById = async (id, report) => {
    var fb = new firebaseService("Visits");
    var docs = [];
    await fb.getById(id).then((data) => {

        let index = data.documents.findIndex(a => a.report == report);
        if (index >= 0) {
            data.documents.splice(index, 1);
            fb.update(data, id);
        }
        docs = data.documents;

    });
    return docs;
}

export const GetVisitsByDoctorUId = async (uid, report) => {
    var visits = [];
    var fb = new firebaseService("Visits");
    await fb.getAll().then((values)=>{

     values.filter(a=>a.data.doctorUid == uid).map(item => {
            visits.push({
            id:item.id,
            data:item.data
          });
        })
        
    });
    return visits;
    
}