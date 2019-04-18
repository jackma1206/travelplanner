import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import TripForm from './TripForm';

class TripsNew extends Component {
    render(){
        return (
            <div><TripForm/></div>
        );
    }
}

export default reduxForm({form: "tripForm"})(TripsNew);