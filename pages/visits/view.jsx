import React from 'react';
import moment from "moment";


class ViewVisit extends React.Component {
    constructor(props){
      super(props);
    }

    static async getInitialProps(ctx) {
  
      return { stars: "" }
    }
  
    componentDidMount() {
       
     } 
    
  
    initialValues = {
      visitNo: this.props.visitNo,
      doctor: this.props.doctor,
      patient: this.props.patient,
      visitTime: moment(this.props.visitTime).format("dd/MM/yyyy hh:mm a"),
      complaint:this.props.complaint,
      allergies:this.props.allergies,
      medications:this.props.medications,
      temperature:this.props.temperature,
      note:this.props.note,
      reports:this.props.reports,
      weight: this.props.weight
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
    
  
    render() {
       const{visitNo} = this.state;
      return (
        <Formik
        initialValues={this.initialValues}
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
        </div>
          );
        }}
        </Formik>
      );
    }
  }
  
  
  
  ViewVisit.layout = "auth";
  
  export default ViewVisit;