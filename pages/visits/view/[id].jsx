import React, {useState, useEffect} from 'react';
import moment from "moment";
import {fbStorage,firebaseService} from '../../../services/firebase-db-service';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import {RemoveReportById} from '../../../services/visit-service';



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ViewVisit = ({visit}) => { 
   console.log(visit);

   const router = useRouter();
   const { id } = router.query;

   const classes = useStyles();

   const [file, setFile] = useState('');
   const [fileUrl, setFileUrl] = useState('');
   const [currentReport, setCurrentReport] = useState('');
   
   const [doc, setDoc] = useState(visit.reports);
 
   const [reportNames, setReportNames] = useState(Object.assign([], visit.reports));
   const [uploadDoc, setUploadDoc] = useState([]);

   const uploadFile = (e) =>{
   

    setCurrentReport(e.currentTarget.id);
    let fileName = `${e.currentTarget.id}_${moment(new Date()).format("DD-MM-yyyy")}`;
   
    
    const uploadTask = fbStorage.ref(`/Documents/${initialValues.patientUid}/${fileName}`).put(file);

    uploadTask.on('state_changed', 
    (snapShot) => {
    
      console.log(snapShot)
    }, (err) => {
      
      console.log(err)
    }, (e) => {
     
      
      fbStorage.ref(`/Documents/${initialValues.patientUid}`).child(fileName).getDownloadURL()
       .then(fileUrl => {      
        setFileUrl(fileUrl);        
       })
    })
  }

    useEffect(()=>{
if(initialValues.documents){
      initialValues.documents.map(a => {
        
        const i = doc.indexOf(a.report);
        doc.splice(i,1);
      });
      setUploadDoc(initialValues.documents);
    }
    {
      initialValues.documents = [];
    }
       
    

      if(currentReport){
      var fb = new firebaseService("Visits");
      fb.getById(id).then((data)=>{
        debugger;
        var index = uploadDoc.findIndex(a=>a.report ==`${currentReport}`);
        uploadDoc[index].file = fileUrl;
        uploadDoc[index].date = new Date().toString();
        
        setUploadDoc(uploadDoc);
        data.documents = uploadDoc.filter(a=>a.file != "");
        // if(data.documents){
        //   let index = data.documents.findIndex(a=>a.report == `${currentReport}`);
        //     if(index >= 0){
        //       data.documents[index].file = fileUrl;
        //       data.documents[index].date = new Date().toString();            
        //     }
        //     else{
        //       let report = {file: fileUrl, date: new Date().toString(), report: `${currentReport}`}
        //       data.documents.push(report);
        //     }
            
        // }
        // else{
        //   data.documents = uploadDoc;
        // }
        fb.update(data,id);
            
        setCurrentReport("");
        initialValues.documents = data.documents;
      console.log(data);

        
      });
    }

    },[fileUrl]);
  
     const initialValues = {
      visitNo:  visit.visitNo,
      doctor: visit.doctor,
      patient: visit.patient,
      visitTime: moment(visit.visitTime).format("dd/MM/yyyy hh:mm a"),
      complaint: visit.complaint,
      allergies: visit.allergies,
      medications: visit.medications,
      temperature: visit.temperature,
      note: visit.note,
      reports: visit.reports,
      weight: visit.weight,
      patientUid: visit.patientUid,
      documents: visit.documents
    };
    
    
    const handleFile = (e) => {
      const image = e.target.files[0]
      setFile(File => (image));
     } 

    const isReportExit = (val) => {
        const index = initialValues.documents.findIndex(a=>a.report == val);
        return index >= 0;
    }
  

  const handleReportChange = (e) =>{
    
  
    const name = e.target.value;
    if(name){
    let rep = {file:"", date:"", report:name};
    // initialValues.documents.push(rep);
    uploadDoc.push(rep)
     setUploadDoc(uploadDoc);
    //const i  = doc.indexOf(name);
    // doc.splice(i,1);
    let docs = doc.filter(a=>a != name);
    setDoc(docs);
    }
  }

  const handleDeleteIcon = (e) =>{
    debugger;
    const name = e.currentTarget.id;
    if(name){
    doc.push(name);
    setDoc(doc);
     console.log(doc);

 RemoveReportById(id, name).then((docs)=>{    
   debugger;  
  initialValues.documents= docs;
  setUploadDoc(docs);
});

   
    // let uploadDocs = initialValues.documents.filter(a=>a != e.currentTarget.id);
    // if(uploadDocs.length == 0){
    //   setUploadDoc([]);
    // }
    // else{
    //   setUploadDoc(uploadDocs);
    // }
    //  console.log(uploadDoc);
  }

  }
  
    
      return (
        <Formik
        enableReinitialize={true} 
        initialValues={initialValues}
        >
  {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
            setFieldValue
          } = formik;
          return (
            <div className="container"> 
        <div>
          <h1 style={{ color: '#2362AD' }}>Visit Information</h1>
  
          <Form class="row g-3">
          <div class="row g-3">
           <div class="col-md-1">            
              <label for="visitNo" class="form-label">Visit#</label>
                <Field
                    type="text"
                    name="visitNo"
                    id="visitNo"
                    readOnly
                    className="form-control"                    
                  />
              </div>
          </div>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Doctor</label>
                <Field
                    type="text"
                    name="doctor"
                    id="doctor"
                    className="form-control"
                    readOnly
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Patient</label>
                <Field
                    type="text"
                    name="patient"
                    id="patient"
                    className="form-control"
                    readOnly
                  />
              </div>
            </div>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Date & Time</label>
                <div className="customDatePickerWidth">
                <Field
                    type="text"
                    name="patient"
                    id="patient"
                    className="form-control"
                    readOnly
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Complaint</label>
                <Field
                    type="text"
                    name="complaint"
                    id="complaint"
                    className="form-control"
                    readOnly
                  />
              </div>
            </div>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Allergies</label>
                <Field
                    type="text"
                    name="allergies"
                    id="allergies"
                    className="form-control"
                    readOnly
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Temperature</label>
                <Field
                    type="number"
                    name="temperature"
                    id="temperature"
                    className="form-control"
                    readOnly
                  />
              </div>
            </div>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Weight</label>
                <Field
                    type="number"
                    name="weight"
                    id="weight"
                    className="form-control"
                    readOnly
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Reports</label>
                {/* <Field
                    type="number"
                    name="reports"
                    id="reports"
                    className="form-control"
                    readOnly
                  /> */}
                   <Field as="select" name="reports" class="form-select" multiple disabled>
                     {reportNames && reportNames.map((data)=>(
                     <option key={data} value={data} selected>{data}</option>
                     ))}                
                   </Field>
              </div>
            </div>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Medications</label>
                <Field
                    type="text"
                    name="medications"
                    id="medications"
                    className="form-control"
                    readOnly
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Note</label>
                <Field
                    type="text"
                    name="note"
                    id="note"
                    className="form-control"
                    readOnly
                  />
              </div>
            </div>
            <div class="row g-3">
         <div class="col-md-3">

         <label for="reports" class="form-label">Upload the Report(s)</label>
         <Field as="select" name="reports" onChange={handleReportChange} class="form-select" readOnly>
         <option value="" selected>Choose to Upload</option>
                     {doc && doc.map((data)=>(
                     <option key={data} value={data}>{data}</option>
                     ))}                
                   </Field>
           </div>
           </div>
{uploadDoc && uploadDoc.map((res)=>(
  <div class="row g-3">
    <div class="col-md-1">
      <Typography variant="subtitle1">
        {res.report}:
      </Typography>
    </div>
    <div class="col-md-5">
     { res.file?.length > 0
      ? <TextField size="small" id="outlined-basic" variant="outlined" value={res.file} readOnly />
      : <input
        type="file"
        name={res.report}
        style={{width:"223px"}}
        onChange={handleFile}
      />
     }
        
  
      
       <Button
        variant="contained"
        color="default"
        size="small"
        id={res.report}
        onClick={uploadFile}
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      <IconButton onClick={handleDeleteIcon} id={res.report} aria-label="Upload">
        <DeleteIcon />
      </IconButton>
    </div>
  </div>

                   ))}
           
          </Form>
        </div>
        </div>
          );
        }}
        </Formik>
      );
  }
  
  
  
  ViewVisit.layout = "auth";
  export async function getServerSideProps ({ params }) {
    var fb = new firebaseService("Visits");
    let visit = {};
    if(params.id){
    await fb.getById(params.id).then((res)=>{
       visit = res;
    });
    }
    return { props: {visit}}
  }
//   export async function getServerSideProps({ params }) {
   
//     var fb = new firebaseService("Visits");
//     const visits = {};
//     if(params.id){
//     fb.getById(params.id).then((res)=>{
     
//         visits = res;
//         console.log(visits);
//     });
//     }
    
//     return {
//        props: {visits }
//     }
// }
  
  export default ViewVisit;