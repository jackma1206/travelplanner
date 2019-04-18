import {FETCH_USER} from '../actions/types';

export default function(state = null, action){
    //handle the action request
    switch (action.type){
        case FETCH_USER: 
            return action.payload || false;
        default: 
            return state;
    }
}