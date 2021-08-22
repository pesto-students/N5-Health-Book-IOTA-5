import React,{useState,useEffect} from 'react'
import DatePicker from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {firebaseService} from '../../services/firebase-db-service';
import "react-datepicker/dist/react-datepicker.css";
import { isAuth } from "../../actions/auth";
import moment from "moment";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const AddPatient= () => { 
 
 const [patientId, setPatientId] = useState(); 
 const [patient, setPatient] = useState({fullName:"",
  gender: "",
  dob: "",
  bloodGroup:"",
  maritalStatus:"",
  city:"",
  state:"",
  weight:"",
  address:"",
  mobile:"",
  });
  


  useEffect(()=>{
    let user = isAuth();
 
    var fb = new firebaseService("Patient");
    fb.getUserByUId(user.uid).then((values)=>{
      
      if(values && values.length){
     setPatientId(values[0].id);
     setPatient(values[0].data);
     console.log("Patient: ",patient );
      }   
       
    });
  },[]);

 const initialValues = {
  fullName:patient.fullName,
  gender: patient.gender,
  dob: patient.dob == "" ? "" : new Date(patient.dob),
  bloodGroup:patient.bloodGroup,
  maritalStatus:patient.maritalStatus,
  city:patient.city,
  state:patient.state,
  weight: patient.weight,
  mobile:patient.mobile,
  uid:patient.uid,
  address:patient.address
};


const submitForm = (values) => {

var fb = new firebaseService("Patient");
values.dob = new Date(values.dob).toString();
fb.update(values,patientId);
toast.success('Profile has been updated!',{autoClose:2000});
};

const phoneRegExp = /^[0-9]{10}$/;
                    
const PatientSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required."),
  gender: Yup.string().required("Gender is required."),
  dob: Yup.string().required("DOB is required."),
  mobile:Yup.string().required("Mobile No is required.").matches(phoneRegExp, 'Mobile No is not valid'),
  // bloodGroup: Yup.string().required("Please select the Blood Group."),
  maritalStatus: Yup.string().required("Please select the Matital Status."),
  address: Yup.string().required("Address is required."),
  city: Yup.string().required("City is required."),
  weight: Yup.string().required("Weight is required."),
  state: Yup.string().required("State is required."),
});

 return (
      
      <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={PatientSchema}
      onSubmit={submitForm}
      
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

        console.log("formik",values);
        return (
          <div className="container" style={{marginTop:"6rem"}}> 
      <div>
        <h1 style={{ color: '#2362AD' }}>Patient Profile</h1>

        <Form class="row g-3">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Full Name</label>
              <Field
                  type="text"
                  name="fullName"
                  id="fullName"                  
                  onChange={e =>{ setFieldValue('fullName',e.target.value); }}    
                  className="form-control"                  
                />
              <ErrorMessage name="fullName" component="span" className="error" />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Gender</label>
              <div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="gender" id="inlineRadio1" value="Male"  className="form-check-input" />
                  <label class="form-check-label" for="inlineRadio1">Male</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="gender" id="inlineRadio2" value="Female" className="form-check-input" />
                  <label class="form-check-label" for="inlineRadio2">Female</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="gender" id="inlineRadio3" value="Other" className="form-check-input" />
                  <label class="form-check-label" for="inlineRadio3">Other</label>
                </div>
              </div>
              <ErrorMessage name="gender" component="span" className="error" />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">DOB</label>
              <div className="customDatePickerWidth">
              <DatePicker  
              className="form-control"              
                selected={values.dob}
                onChange={dt => setFieldValue('dob', dt)}
                maxDate={moment().toDate()}
                dateFormat="dd/MM/yyyy"
                style={{width:'100%'}}
              />
              </div>
              <ErrorMessage name="dob" component="span" className="error" />          
              
            </div>
            <div class="col-md-6">
            <label for="address" class="form-label">Mobile No</label>
              <Field
                  type="text"
                  name="mobile"
                  id="mobile"                  
                  onChange={e => {setFieldValue('mobile', e.target.value);}}    
                  className="form-control"
                />
                <ErrorMessage name="mobile" component="span" className="error" />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Weight (Kg)</label>
              <Field
                  type="number"
                  name="weight"
                  id="weight"
                  className="form-control"
                />
                <ErrorMessage name="weight" component="span" className="error" />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Marital Status</label>
              <Field as="select" value={values.maritalStatus} name="maritalStatus" class="form-select">
                <option value="" selected>Choose...</option>
                <option value="S">Single</option>
                <option value="M">Married</option>
                <option value="W">Widowed</option>      
              </Field>
              <ErrorMessage name="maritalStatus" component="span" className="error" />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Blood Group</label>
              <Field as="select" value={values.bloodGroup} name="bloodGroup" class="form-select">
                <option value="" selected>Choose...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Field>
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Address</label>
              <Field
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                />
                <ErrorMessage name="address" component="span" className="error" />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">City</label>
              <Field
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                />
                <ErrorMessage name="city" component="span" className="error" />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">State</label>
              <Field
                  type="text"
                  name="state"
                  id="state"
                  className="form-control"
                />
                <ErrorMessage name="state" component="span" className="error" />
            </div>
          </div>
          <div class="col-md-12 text-center"> 
          {/* disabled={!(dirty && isValid)} */}
            <button type="submit" style={{ width: '300px' }} className="btn btn-primary btn-block">Update</button>
          </div>
         
        </Form>
      </div>
      </div>
       );
      }}
      </Formik>
    );
    }



// AddPatient.getInitialProps = async (ctx) => {
//     console.log("Res");
//     var fb = new firebaseService("Users");
//     let user = {};
//     const auth = isAuth();
//     await fb.getUserByUId(auth.uid).then((res)=>{
//       user = res[0].data;
//       console.log(res[0], "Res");
//     });
   
//     return { props: {user}}
  
//   }



export default AddPatient;









// import AddPatient from '../../components/patients/AddPatient';

// export default AddPatient;
