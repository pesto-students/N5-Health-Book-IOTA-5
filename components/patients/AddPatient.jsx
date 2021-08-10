import React from 'react'
import DatePicker from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {firebaseService} from '../../services/firebase-db-service';
import "react-datepicker/dist/react-datepicker.css";

class AddPatient extends React.Component {
  constructor(props){
    super(props);
    // this.state = {date: new Date()};
  }
  static async getInitialProps(ctx) {

    return { stars: "" }
  }

 initialValues = {
  fullname: "",
  gender: "",
  dob: new Date(),
  bloodGroup:"",
  allergies:"",
  maritalStatus:"",
  address:"",
  city:"",
  state:"",
  weight: ""
};


submitForm = (values) => {
var fb = new firebaseService("Patient");
values.dob = values.dob.toString();
fb.create(values);
console.log(values);
};

PatientSchema = Yup.object().shape({
  fullname: Yup.string().required("Full Name is required."),
  gender: Yup.string().required("Gender is required."),
  dob: Yup.string().required("DOB is required."),
  bloodGroup: Yup.string().required("Please select the Blood Group."),
  maritalStatus: Yup.string().required("Please select the Matital Status."),
  address: Yup.string().required("Address is required."),
  city: Yup.string().required("City is required."),
  weight: Yup.string().required("Weight is required."),
  state: Yup.string().required("State is required."),
});

  render() {
    return (
      <Formik
      initialValues={this.initialValues}
      validationSchema={this.PatientSchema}
      onSubmit={this.submitForm}
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
        <h1 style={{ color: '#2362AD' }}>Patient Infromation</h1>

        <Form class="row g-3">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Full Name</label>
              <Field
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="form-control"                  
                />
              <ErrorMessage name="fullname" component="span" className="error" />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Gender</label>
              <div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="gender" id="inlineRadio1" value="Male" className="form-check-input" />
                  {/* <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> */}
                  <label class="form-check-label" for="inlineRadio1">Male</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="gender" id="inlineRadio2" value="Female" className="form-check-input" />
                  {/* <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> */}
                  <label class="form-check-label" for="inlineRadio2">Female</label>
                </div>
                <div class="form-check form-check-inline">
                  <Field type="radio" name="gender" id="inlineRadio3" value="Other" className="form-check-input" />
                  {/* <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" /> */}
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
                dateFormat="dd/MM/yyyy"
                style={{width:'100%'}}
              />
              </div>
              <ErrorMessage name="dob" component="span" className="error" />          
              
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Blood Group</label>
              <Field as="select" name="bloodGroup" class="form-select">
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
              <ErrorMessage name="bloodGroup" component="span" className="error" />
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
              <label for="inputPassword4" class="form-label">Merital Status</label>
              <Field as="select" name="maritalStatus" class="form-select">
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
              <label for="inputEmail4" class="form-label">Allergies</label>
              <Field
                  type="text"
                  name="allergies"
                  id="allergies"
                  className="form-control"
                />
                <ErrorMessage name="allergies" component="span" className="error" />
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
}



AddPatient.layout = "auth";

export default AddPatient;




