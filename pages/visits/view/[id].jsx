import React from 'react';
import moment from "moment";
import {firebaseService} from '../../../services/firebase-db-service';
import { Formik, Form, Field, ErrorMessage } from "formik";

const ViewVisit = ({visit}) => { 
   console.log(visit);
    
  
     const initialValues = {
      visitNo: "",
      doctor: "",
      patient: "",
      visitTime: new Date(),
      complaint:"",
      allergies:"",
      medications:"",
      temperature:"",
      note:"",
      reports:"",
      weight: ""
    };
  
    // VisitSchema = Yup.object().shape({
    //   doctor: Yup.string().required("Doctor is required."),
    //   patient: Yup.string().required("Patient is required."),
    //   visitTime: Yup.string().required("Date & Time is required."),
    //   complaint: Yup.string().required("Please select the Blood Group."),
    //   medications: Yup.string().required("Medications is required."),
    //   note: Yup.string().required("Note is required.")
    // });
  
    // submitForm = (values) => {
    //   debugger;
    //  // let dvalues = {firstName:"Prachi",lastName:"Patel",mobile:"7854126598", email:"prachip@gmail.com",degree:"M.B.B.S", password:"123456"}
    //   var fb = new firebaseService("Visits");
    //   values.visitTime = values.visitTime.toString();
    //   fb.create(values);  
    //   // console.log(values);
    //   };
    
  
    
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
          <h1 style={{ color: '#2362AD' }}>Visit {visit.doctor}</h1>
  
          <Form class="row g-3">
          <div class="row g-3">
           <div class="col-md-1">
              {/* Visit# {visitNo} */}
              <label for="visitNo" class="form-label">Visit#</label>
                <Field
                    type="text"
                    name="visitTime"
                    id="visitTime"
                    className="form-control"
                    disabled={true}
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
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Patient</label>
                <Field
                    type="text"
                    name="patient"
                    id="patient"
                    className="form-control"
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
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Temperature</label>
                <Field
                    type="number"
                    name="temperature"
                    id="temperature"
                    className="form-control"
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
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Reports</label>
                <Field
                    type="number"
                    name="reports"
                    id="reports"
                    className="form-control"
                  />
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
                  />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Note</label>
                <Field
                    type="text"
                    name="note"
                    id="note"
                    className="form-control"
                  />
              </div>
            </div>
            <div class="col-md-12 text-center">
              <button type="submit" style={{ width: '300px' }} class="btn btn-primary btn-block">Add</button>
            </div>
          </Form>
        </div>
        </div>
          );
        }}
        </Formik>
      );
  }
  
  
  
  ViewVisit.layout = "auth";
  export async function getServerSideProps({ params }) {
    debugger;
    var fb = new firebaseService("Visits");
    let visit = {};
    if(params.id){
    fb.getById(params.id).then((res)=>{
       visit = res;
       console.log(visit);
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