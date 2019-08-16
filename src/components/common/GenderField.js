import {SelectInput} from 'react-admin'
import React from 'react'

export const GenderField = (props) => (<SelectInput choices={[
    {id: 'M', name: "Male"},
    {id: 'F', name: "Female"}
]} optionText="name" optionValue="id" {...props} />);
