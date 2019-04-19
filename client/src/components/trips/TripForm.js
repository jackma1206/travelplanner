import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import renderDatePicker from './renderDatePicker';
import moment from 'moment';


class TripForm extends Component {

   
    render(){
        return(
            <div style={{marginTop: "20px"}}>
                <form style={{width:"50%", margin:"0 auto"}}>
                    <div className="row">
                        <div className="col s12">
                            <label htmlFor="name">Trip Name</label>
                            <Field component="input" type="text" name="name"/>
                        </div>
                        <div className="col s6">
                            <label htmlFor="fromDest">From</label>
                            <Field component="input" type="text" name="fromDest"/>
                        </div>
                        <div className="col s6">
                            <label htmlFor="toDest">To</label>
                        <   Field component="input" type="text" name="toDest"/>
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
                            <label htmlFor="flightCost">Flight Cost</label>
                            <Field component='input' name="flightCost"/>
                        </div>
                        <div className="col s3">
                            <label>Travelers</label>
                            <Field component="input" name="numPeople" />
                        </div>
                    </div>
                    
                </form>
            </div>
        );
    }
  
}

export default reduxForm({form:'tripForm', destroyOnUnmount:false})(TripForm);

