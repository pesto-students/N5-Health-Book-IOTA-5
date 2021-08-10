import React from 'react'
import DatePicker from "react-datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {firebaseService} from '../../services/firebase-db-service';
import "react-datepicker/dist/react-datepicker.css";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';


class AddVisit extends React.Component {
  constructor(props){
    super(props);
    this.state = {visitNo: "", doctorUid:"",patientUid:"", complaints:[], complaintName:[]};
  }
  static async getInitialProps(ctx) {

    return { stars: "" }
  }

   getStyles = (name, personName, theme) =>{
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  componentDidMount() {
    this.setState({visitNo: this.getRandomNo()}); 
    var fb = new firebaseService("Complaints");  
    fb.getAll().then((res)=>{
      
      let complaintList = res.map(a=>a.id);
        this.setState({complaints: complaintList});
        console.log(this.state.complaints);
    });
   }

    ITEM_HEIGHT = 48;
     ITEM_PADDING_TOP = 8;

   MenuProps = {
  PaperProps: {
    style: {
      maxHeight: this.ITEM_HEIGHT * 4.5 + this.ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  getRandomNo = () =>{
    return Math.floor(Math.random()*((99999-1)+1)+1)
  }

  handleChange = (event) => {
    debugger;
    this.setState({complaintName: event.target.value})
  };

  initialValues = {
    visitNo: this.getRandomNo(),
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

  VisitSchema = Yup.object().shape({
    doctor: Yup.string().required("Doctor is required."),
    patient: Yup.string().required("Patient is required."),
    visitTime: Yup.string().required("Date & Time is required."),
    complaint: Yup.string().required("Please select the Blood Group."),
    medications: Yup.string().required("Medications is required."),
    note: Yup.string().required("Note is required.")
  });

  submitForm = (values) => {
    debugger;
   // let dvalues = {firstName:"Prachi",lastName:"Patel",mobile:"7854126598", email:"prachip@gmail.com",degree:"M.B.B.S", password:"123456"}
    var fb = new firebaseService("Visits");
    values.visitTime = values.visitTime.toString();
    fb.create(values);  
    // console.log(values);
    };
  

  render() {
     const{visitNo, complaints, complaintName} = this.state;
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
          <div className="container"> 
      <div>
        <h1 style={{ color: '#2362AD' }}>Visit</h1>

        <Form class="row g-3">
        <div class="row g-3">
         <div class="col-md-1">
            {/* Visit# {visitNo} */}
            <label for="visitNo" class="form-label">Visit#</label>
              <Field
                  type="text"
                  name="visitNo"
                  id="visitNo"
                  className="form-control"
                  disabled={true}
                />
                <ErrorMessage name="visitNo" component="span" className="error" />
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
              <Field
                  type="text"
                  name="patient"
                  id="patient"
                  className="form-control"
                />
                <ErrorMessage name="patient" component="span" className="error" />
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Date & Time</label>
              <div className="customDatePickerWidth">
              <DatePicker  
              className="form-control"              
                selected={values.visitTime}
                onChange={dt => setFieldValue('visitTime', dt)}               
                showTimeSelect
                dateFormat="Pp"              
                style={{width:'100%'}}
              />
              </div>
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Complaint</label>
              <Field as="select" name="complaint" class="form-select">
                <option value="" selected>Choose...</option>
                {complaints.map((name) => (
                   <option key={name} value={name}>{name}</option>
                ))}
               
              </Field>
              {/* <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          className="form-control"
          multiple
          value={complaintName}
          onChange={dt => setFieldValue('complaint', dt)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={this.MenuProps}
        >
          {complaints.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={values.complaint.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select> */}
              {/* <Field
                  type="text"
                  name="complaint"
                  id="complaint"
                  className="form-control"
                /> */}
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
      </div>
        );
      }}
      </Formik>
    );
  }
}



AddVisit.layout = "auth";

export default AddVisit;




