import React from 'react';
import {List, Datagrid, TextField, EmailField, BooleanField, EditButton, Filter, TextInput} from 'react-admin';

const OperatorFilter = (props) => (
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

export const OperatorList = props => (
    <List {...props} filters={<OperatorFilter/>}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="mobile" />
            <EmailField source="email" />
            <TextField source="gender" />
            <TextField source="dob" />
            <EditButton/>
        </Datagrid>
    </List>
);
