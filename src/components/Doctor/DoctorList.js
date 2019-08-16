import React from 'react';
import {List, Datagrid, TextField, EmailField, BooleanField, EditButton, Filter, TextInput, BooleanInput} from 'react-admin';

const DoctorFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="search" alwaysOn={true}/>
        {/*<BooleanInput label={"Review Again"} source={"again_review"} alwaysOn={false}/>*/}
        {/*<BooleanInput label={"Images unclear"} source={"images_unclear"} alwaysOn={false}/>*/}
        {/*<DateInput label="Sample Date" source="created" />*/}
        {/*<ReferenceInput label="User" source="userId" reference="users" allowEmpty>*/}
        {/*    <SelectInput optionText="name" />*/}
        {/*</ReferenceInput>*/}
    </Filter>
);

export const DoctorList = props => (
    <List {...props} filters={<DoctorFilter/>}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="mobile" />
            <EmailField source="email" />
            <TextField source="gender" />
            <TextField source="dob" />
            <TextField source="degree" />
            <EditButton/>
        </Datagrid>
    </List>
);
