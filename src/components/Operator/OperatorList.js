import React from 'react';
import {List, Datagrid, TextField, EmailField, BooleanField, EditButton, Filter, TextInput, DateField, DeleteButton,
    BulkDeleteButton}
from 'react-admin';
import {CustomActions} from "../common/CustomButton";

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

export const OperatorList = ({permissions, ...props}) => (
    <List {...props}
          filters={<OperatorFilter/>}
          actions={<CustomActions/>}
          title={"List of Operators"}
          bulkActionButtons={permissions === 'admin' ? <BulkDeleteButton/> : false}
    >
        <Datagrid>
            <TextField source="name" />
            <TextField source="mobile" />
            <EmailField source="email" />
            <TextField source="gender" />
            <DateField source="dob"  options={{year: 'numeric', month: 'long', day: 'numeric' }}  />
            <EditButton/>
            {/*{permissions === 'admin' ? <DeleteButton label={''} undoable={false}/> : null }*/}
        </Datagrid>
    </List>
);
