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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {GetAllPatients} from '../../services/patient-service';
import { isAuth} from '../../actions/auth';
import InputAdornment from '@material-ui/core/InputAdornment';


class AddVisit extends React.Component {
  constructor(props){
    super(props);
    this.state = {visitNo: "", doctorUid:"", doctor:"",reportNames:[], mReports:[], complaints:[], complaintName:[],
        patients: []};
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
   

    GetAllPatients().then((patients)=>{      
      this.setState({patients: patients});
    });

    let user = isAuth();    
    this.setState({doctorUid : user.uid});
    this.initialValues.doctorUid = user.uid;

    var fbUser = new firebaseService("Users");
    fbUser.getUserByUId(user.uid).then((value)=>{
      this.setState({doctor: value[0].data.name});
      this.initialValues.doctor = value[0].data.name;
    });

    var fbReports = new firebaseService("reports");
    fbReports.getAll().then((res)=>{
    
      let reportList = res.map(a=>a.id);
        this.setState({mReports: reportList});
    });
    
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
   
    this.setState({reportNames: event.target.value});
    this.initialValues.reports = event.target.value;
  };

  initialValues = {
    visitNo: this.getRandomNo(),
    doctor: "",
    doctorUid: "",
    patient: "",
    patientUid:"",
    visitTime: new Date(),
    complaint:"",
    allergies:"",
    medications:"",
    temperature:"",
    note:"",
    reports:[],
    weight: "",
    documents:[]

  };

  

  

  VisitSchema = Yup.object().shape({
    // doctor: Yup.string().required("Doctor is required."),
    // patient: Yup.string().required("Patient is required."),
    visitTime: Yup.string().required("Date & Time is required."),
    complaint: Yup.string().required("Please select the Blood Group."),
    medications: Yup.string().required("Medications is required."),
    note: Yup.string().required("Note is required.")
  });

  submitForm = (values) => {
    debugger;
    var fb = new firebaseService("Visits");
    values.visitTime = values.visitTime.toString();
    values.reports = this.state.reportNames;
    fb.create(values); 
      };
  

  render() {
     const{visitNo, complaints, complaintName, patients,reportNames, mReports} = this.state;
    return (
      <Formik
      enableReinitialize
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
         <div class="col-md-3">
            <label for="visitNo" class="form-label">Select Patient</label>
            <Autocomplete
      id="com-demo"      
      options={patients}
      getOptionLabel={(option) => option.name}
      size="small"
       onChange={(e,val) => {setFieldValue('patient', val.name);setFieldValue('patientUid', val.uid);}} 
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
                <ErrorMessage name="visitNo" component="span" className="error" />
            </div>
        </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" style={{"margin-bottom":"2px"}} class="form-label">Date & Time</label>
              <div className="customDatePickerWidth"> 
              <DatePicker  
              className="form-control"              
                selected={values.visitTime}
                onChange={dt => setFieldValue('visitTime', dt)}               
                showTimeSelect
                dateFormat="Pp"              
                style={{width:'100%',padding:'10px'}}
              />
              {/* <TextField
              variant="outlined"
              size="small"
              disableUnderline
    id="datetime-local"    
    type="datetime-local"
    defaultValue={new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()+" "+new Date().getTime()}
    className="form-control"
    InputLabelProps={{
      shrink: true,
    }}
  /> */}
               </div> 
            </div>
            <div class="col-md-6">
              <label style={{"margin-bottom":"2px"}} for="inputPassword4" class="form-label">Complaint</label>
              <Select
          value={values.complaint}
          onChange={(e) => setFieldValue('complaint', e.target.value)}
          displayEmpty
          size="small"
          className="form-control"
          inputProps={{ 'aria-label': 'Without label' }}
          disableUnderline
        >
          <MenuItem value="" disabled>
            Choose
          </MenuItem>
          {complaints.map((name) => (
                   <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}
          
        </Select>
              {/* <Field as="select" name="complaint" class="form-select">
                <option value="" selected>Choose...</option>
                {complaints.map((name) => (
                   <option key={name} value={name}>{name}</option>
                ))}
               
              </Field> */}
               
              
                <ErrorMessage name="complaint" component="span" className="error" />
            </div>
          </div> 
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Allergies</label>
              {/* <Field
                  type="text"
                  name="allergies"
                  id="allergies"
                  className="form-control"
                /> */}
                <div>
                <TextField 
                id="outlined-basic"                
                onChange={(e) => setFieldValue('allergies',e.target.value)} 
                size="small" 
                style={{width:"100%"}}                
                variant="outlined" />
                </div>
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Temperature</label>
              {/* <Field
                  type="number"
                  name="temperature"
                  id="temperature"
                  className="form-control"
                /> */}
                <TextField 
                id="outlined-basic"
                type="number" 
                onChange={(e) => setFieldValue('temperature',e.target.value)} 
                size="small" 
                className="form-control" 
                variant="outlined" />
            </div> 
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Weight</label>
              {/* <Field
                  type="number"
                  name="weight"
                  id="weight"
                  className="form-control"
                /> */}
                <div>
                <TextField 
                id="outlined-basic" 
                type="number"
                onChange={(e) => setFieldValue('weight',e.target.value)} 
                size="small" 
                style={{width:"100%"}}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                }}
                variant="outlined" />
                </div>
                {/* <ErrorMessage name="weight" component="span" className="error" /> */}
            </div>
            <div class="col-md-6">
              <label style={{"margin-bottom":"2px"}} for="inputPassword4" class="form-label">Reports</label>
              {/* <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple
          size="small"
          className="form-control"
          value={reportNames}
          onChange={this.handleChange}
          input={<Input />}
          MenuProps={this.MenuProps}
          disableUnderline
        >
          {mReports.map((name) => (
            <MenuItem key={name} value={name} >
              {name}
            </MenuItem>
          ))}
        </Select> */}
              <Select         
          id="demo-mutiple-checkbox"
          style={{width:"100%"}}
          multiple
          value={reportNames}
          onChange={this.handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={this.MenuProps}
          className="form-control"
          disableUnderline
        >
          {mReports.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={reportNames.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
              {/* <Field as="select" name="reports" class="form-select">
                <option value="" selected>Choose...</option>
                <option value="Blood Report">Blood Report</option>
                <option value="Himoglobin Report">Himoglobin Report</option>
                <option value="RTPCR">RTPCR</option>                
              </Field> */}
            </div>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">Medications</label>
              {/* <Field
                  type="text"
                  name="medications"
                  id="medications"
                  className="form-control"
                /> */}
                <div>
                <TextField 
                id="outlined-basic" 
                onChange={(e) => setFieldValue('medications',e.target.value)} 
                size="small" 
                style={{width:"100%"}} 
                variant="outlined" />
                </div>
                <ErrorMessage name="medications" component="span" className="error" />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">Note</label>
              {/* <Field
                  type="text"
                  name="note"
                  id="note"
                  className="form-control"
                /> */}
                <div>
                <TextField 
                id="outlined-basic" 
                onChange={(e) => setFieldValue('note',e.target.value)} 
                size="small" 
                style={{width:"100%"}}
                variant="outlined" />
                </div>
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




