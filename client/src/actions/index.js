import axios from 'axios';
import {FETCH_USER, SUBMIT_TRIP} from './types';

export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER, payload: res.data});
    };

export const submitTrip = values => async dispatch => {
    
    const res = await axios.post('/api/trips', values);
    dispatch( {type: SUBMIT_TRIP, payload: res.data});
};