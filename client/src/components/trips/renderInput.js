import React, {Component} from 'react';
import M from 'materialize-css';

class renderInput extends Component{
    constructor(props){
        super(props);
        M.AutoInit();
    }
    render(){
        const { input, meta, label, ...rest} = this.props;
        return(
           
                  <div className="input-field">
                    <label>{label}</label>
                    <input {...input} {...rest}/>
                    {meta.error && meta.touched && (
                      <span className="form-errors">{meta.error}</span>
                    )}
                  </div>
            
        );
    }
}

export default renderInput;