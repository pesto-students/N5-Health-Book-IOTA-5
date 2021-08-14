import React, {useState, useEffect} from 'react';
import moment from "moment";
import {fbStorage,firebaseService} from '../../../services/firebase-db-service';
import { Formik, Form, Field, ErrorMessage } from "formik";

const ViewVisit = ({visit}) => { 
   console.log(visit);

   const [file, setFile] = useState('');
   
    
  
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
      weight: visit.weight
    };
    
    
    const handleFile = (e) => {
      const image = e.target.files[0]
      setFile(File => (image));
  } 

  const uploadFile = (e) =>{
    debugger;
    const uploadTask = fbStorage.ref(`/Documents/${initialValues.patient}/${file.name}`).put(file)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      fbStorage.ref(`/Documents/${initialValues.patient}`).child(file.name).getDownloadURL()
       .then(fileUrl => {
         setFile(prevObject => ({...prevObject, fileUrl: fileUrl}))
       })
    })
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
                   <Field as="select" name="reports" class="form-select" multiple readOnly>
                     {visit.reports && visit.reports.map((data)=>(
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
           {values.reports && values.reports.map((name)=>(
                <div>
          <label for="visitNo" class="form-label">{name}</label>
            <input 
          type="file"
          onChange={handleFile}
        />
        <button onClick={uploadFile}>Upload</button>
                  </div>
             
           ))}
            
            </div>
        </div>

            {/* <div class="col-md-12 text-center">
              <button type="submit" style={{ width: '300px' }} class="btn btn-primary btn-block">Add</button>
            </div> */}
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