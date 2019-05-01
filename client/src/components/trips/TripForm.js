import React from 'react';
import {Field, reduxForm} from 'redux-form';
import renderDatePicker from './renderDatePicker';
import renderDestination from './renderDestination';
import moment from 'moment';
import '../../styles/tripForm.scss';
import {airports} from './airportsList';


const TripForm = ({handleSubmit, submitting, value}) => {

    
        const renderInput = ({input, meta, label}) =>{
            return(<div >
                <label>{label}</label>
                <input {...input} />
                {meta.error && meta.touched &&
                    <span className="form-errors">{meta.error}</span>
                }
            </div>
            );
        }
        return(
            <div className='formContainer'>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col s12">
                            <Field component={renderInput} label="Trip Name" type="text" name="tripName"/>
                        </div>
                        <div className="col s6">
                            <Field component={renderDestination} label="From" type="text" name="fromDest" data={airports}/>
                        </div>
                        <div className="col s6">
                            <Field component={renderDestination} label="To" type="text" name="toDest" data={airports} value={value}/>
                        </div>
                        <div className="col s3">
                            <Field component={renderDatePicker} name="departDate" label='Depart Date'
                                    normalize={value => (value ? moment(value).format('MM-DD-YYYY') : null)} 
                                    inputValueFormat="MM-DD-YYYY"/>
                        </div>
                        <div className="col s3 ">
                            <Field component={renderDatePicker} name="returnDate" label="Return Date" 
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

