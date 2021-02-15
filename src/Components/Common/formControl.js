import React from 'react';
import {Field} from "redux-form";

export const CreateField = (component,name,placeholder,validate,props) =>(
    <div>
        <Field placeholder={placeholder} name={name} component={component} validate={validate}
               {...props}/>
    </div>
);