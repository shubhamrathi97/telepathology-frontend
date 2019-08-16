import React from 'react';
import {List, Datagrid, TextField, EmailField, BooleanField, NumberField, DateField, ReferenceField, Filter,
    FilterButton, TextInput, ShowButton, EditButton, DateInput, BooleanInput, BulkDeleteButton} from 'react-admin';

const SampleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="search"  alwaysOn={true}/>
        <BooleanInput label={"Reviewed Sample"} source={"reviewed"} alwaysOn={false}/>
        {/*<DateInput label="Sample Date" source="created" />*/}
        {/*<ReferenceInput label="User" source="userId" reference="users" allowEmpty>*/}
        {/*    <SelectInput optionText="name" />*/}
        {/*</ReferenceInput>*/}
    </Filter>
);

export const SampleList = ({permissions, ...props}) => (
    <List {...props}
          title={"Samples"}
          filters={<SampleFilter/>}
          bulkActionButtons={permissions === 'admin' ? <BulkDeleteButton/> : false}>
        <Datagrid>
            {/*<TextField source="id" />*/}
            {/*<NumberField source="batch.id" />*/}
            <TextField source="patient.name" label={"Patient"} />
            <TextField source="patient.mobile" label={"Patient mobile"} />
            <DateField source="created" label={"Sample Date"}/>
            <TextField source="sample_type" label={"Sample Type"} />
            <TextField source="operator_detail.name" label={"Operator Name"}/>
            <ShowButton/>
            {/*<EditButton/>*/}
        </Datagrid>
    </List>
);
