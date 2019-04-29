import React from 'react';
import {Field, reduxForm} from 'redux-form';
import renderDatePicker from './renderDatePicker';
import moment from 'moment';


const TripForm = ({handleSubmit, submitting}) => {

    
        const renderInput = ({input, meta, label}) =>{
            return(<div >
                <label>{label}</label>
                <input {...input} />
                {meta.error && meta.touched &&
                    <span style={{color:'red'}}>{meta.error}</span>
                }
            </div>
            );
        }
        return(
            <div style={{marginTop: "20px"}}>
                <form onSubmit={handleSubmit} style={{width:"70%", margin:"0 auto"}}>
                    <div className="row">
                        <div className="col s12">
                            <Field component={renderInput} label="Trip Name" type="text" name="tripName"/>
                        </div>
                        <div className="col s6">
                            <Field component={renderInput} label="From" type="text" name="fromDest"/>
                        </div>
                        <div className="col s6">
                        <   Field component={renderInput} label="To" type="text" name="toDest"/>
                        </div>
                        <div className="col s3">
                            <label htmlFor="departDate">Depart Date</label>
                            <Field component={renderDatePicker} name="departDate" 
                                    normalize={value => (value ? moment(value).format('MM-DD-YYYY') : null)} 
                                    inputValueFormat="MM-DD-YYYY"/>
                        </div>
                        <div className="col s3 ">
                            <label htmlFor="returnDate">Return Date</label>
                            <Field component={renderDatePicker} name="returnDate" 
                                    normalize={value => (value ? moment(value).format('MM-DD-YYYY') : null)} 
                                    inputValueFormat="MM-DD-YYYY"/>
                        </div>
                        <div className="col s3">
                            <Field component={renderInput} label="Flight Cost" name="flightCost"/>
                        </div>
                        <div className="col s3">
                            <Field component={renderInput} label="Travelers" name="numPeople" />
                        </div>
                    </div>
                        <button className='waves-effect waves-light btn right' type="submit" disabled={submitting}>Submit</button>
                </form>
            </div>
        );
    }
  


const validate = values =>{
    const errors = {};
        if(!values.tripName){
            errors.tripName = 'Please name your trip';
        }
        if(!values.fromDest){
            errors.fromDest = 'Required';
        }
        if(!values.toDest){
            errors.toDest = 'Required';
        }
        if(!values.departDate){
            errors.departDate = 'required';
        }
        if(!values.returnDate){
            errors.returnDate = 'required';
        }
        if(!values.flightCost){
            errors.flightCost = 'required';
        }
        if(!values.numPeople){
            errors.numPeople = 'required';
        }

    return errors;
}

export default reduxForm({  form:'tripForm', 
                            destroyOnUnmount:false,
                            validate
                        })(TripForm);

