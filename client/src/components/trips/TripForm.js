import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class TripForm extends Component {

    render(){
        return(
            <div style={{marginTop: "20px"}}>
                <form>
                    <Field component="input" type="text" label="name" name="name"/>
                </form>
            </div>
        );
    }
  
}

export default reduxForm({form:'tripForm'})(TripForm);