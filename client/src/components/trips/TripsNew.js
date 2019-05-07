import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import TripForm from './TripForm';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class TripsNew extends Component {
    

   
    render(){
        return (
            <div><TripForm onSubmit={values => this.props.submitTrip(values)}/></div>
        );
    }
}

TripsNew = connect(null, actions)(TripsNew);
export default reduxForm({form: "tripForm"})(TripsNew);