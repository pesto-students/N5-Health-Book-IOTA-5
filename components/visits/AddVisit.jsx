import React from 'react'
import DatePicker from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {firebaseService} from '../../services/firebase-db-service';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class AddVisit extends React.Component {
  constructor(props){
    super(props);
    // this.state = {date: new Date()};
  }
  static async getInitialProps(ctx) {

    return { stars: "" }
  }

  // handleDateChange = (e)=>{
  //   this.setState({date: e});
  // }

  initialValues = {
    doctor: "",
    patient: "",
    dob: new Date(),
    complaint:"",
    allergies:"",
    medications:"",
    temperature:"",
    note:"",
    reports:"",
    weight: ""
  };

  VisitSchema = Yup.object().shape({
    doctor: Yup.string().required("Doctor is required."),
    patient: Yup.string().required("Patient is required."),
    dob: Yup.string().required("Date & Time is required."),
    complaint: Yup.string().required("Please select the Blood Group."),
    medications: Yup.string().required("Medications is required."),
    note: Yup.string().required("Note is required.")
  });

  submitForm = (values) => {
    // var fb = new firebaseService("Visit");
    // values.dob = values.dob.toString();
    // fb.create(values);
    console.log(values);
    };
   top100Films = [
      { title: 'The Shawshank Redemption', year: 1994 },
      { title: 'The Godfather', year: 1972 },
      { title: 'The Godfather: Part II', year: 1974 },
      { title: 'The Dark Knight', year: 2008 },
      { title: '12 Angry Men', year: 1957 },
      { title: "Schindler's List", year: 1993 },
      { title: 'Pulp Fiction', year: 1994 },
      { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
      { title: 'The Good, the Bad and the Ugly', year: 1966 },
      { title: 'Fight Club', year: 1999 },
      { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
      { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
      { title: 'Forrest Gump', year: 1994 },
      { title: 'Inception', year: 2010 },
      { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
      { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
      { title: 'Goodfellas', year: 1990 },
      { title: 'The Matrix', year: 1999 },
      { title: 'Seven Samurai', year: 1954 },
      { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
      { title: 'City of God', year: 2002 },
    
     ]  ;

  render() {
    // const{date} = this.state;
    return (
      <Formik
      initialValues={this.initialValues}
      validationSchema={this.VisitSchema}
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
      <div>
        <h1 style={{ color: '#2362AD' }}>Visit</h1>

        <Form class="row g-3">
        <div class="row g-3">
         <div class="col-md-6">
            Visit# 123655
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
                <ErrorMessage name="doctor" component="span" className="error" />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Patient</label>
              
              {/* <Field
                  type="text"
                  name="patient"
                  id="patient"
                  className="form-control"
                /> */}
                <ErrorMessage name="patient" component="span" className="error" />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="dob" class="form-label">Date Time</label>
              <div className="customDatePickerWidth">
              <DatePicker  
              className="form-control"              
                selected={values.dob}
                onChange={dt => setFieldValue('dob', dt)}             
                dateFormat="dd/MM/yyyy"
                style={{width:'100%'}}
              />
              </div>
            </div>
            <div class="col-md-6">
              <label for="complaint" class="form-label">Complaint</label>
              <Field
                  type="text"
                  name="complaint"
                  id="complaint"
                  className="form-control"
                />
                <ErrorMessage name="complaint" component="span" className="error" />
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
                {/* <ErrorMessage name="allergies" component="span" className="error" /> */}
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Temperature</label>
              <Field
                  type="number"
                  name="temperature"
                  id="temperature"
                  className="form-control"
                />
                {/* <ErrorMessage name="temperature" component="span" className="error" /> */}
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
                {/* <ErrorMessage name="weight" component="span" className="error" /> */}
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Reports</label>
              <Field as="select" name="reports" class="form-select">
                <option value="" selected>Choose...</option>
                <option value="Blood Report">Blood Report</option>
                <option value="Himoglobin Report">Himoglobin Report</option>
                <option value="RTPCR">RTPCR</option>                
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
                />
                <ErrorMessage name="medications" component="span" className="error" />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Note</label>
              <Field
                  type="text"
                  name="note"
                  id="note"
                  className="form-control"
                />
                <ErrorMessage name="note" component="span" className="error" />
            </div>
          </div>
          <div class="col-md-12 text-center">
            <button type="submit" style={{ width: '300px' }} class="btn btn-primary btn-block">Add</button>
          </div>         
        </Form>
      </div>
        );
      }}
      </Formik>
    );
  }
}



AddVisit.layout = "auth";

export default AddVisit;




