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