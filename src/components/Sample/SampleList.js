import React from 'react';
import {List, Datagrid, TextField, DateField, ReferenceField, Filter, ExportButton, TextInput, DeleteButton,
    BooleanInput, BulkDeleteButton, RefreshButton} from 'react-admin';
import {MaterialShowButton, CustomActions, MaterialCreateButton} from "../common/CustomButton";
import {CardActions} from "@material-ui/core";


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

const SampleCustomActions = ({
                                        bulkActions,
                                        basePath,
                                        currentSort,
                                        displayedFilters,
                                        exporter,
                                        filters,
                                        filterValues,
                                        onUnselectItems,
                                        resource,
                                        selectedIds,
                                        showFilter,
                                        total,
                                        createPermission
                                    }) => (
    <CardActions>
        {bulkActions && React.cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) }
        <RefreshButton />
        { createPermission ? <MaterialCreateButton basePath={basePath} />: null}
    </CardActions>
);


export const SampleList = ({permissions, ...props}) => (
            <List {...props}
                  title={"List of Samples"}
                  filters={<SampleFilter/>}
                  actions={<SampleCustomActions createPermission={permissions !== 'doctor'}/>}
                  bulkActionButtons={permissions === 'admin' ? <BulkDeleteButton/> : false}
            >
                <Datagrid>
                    <TextField source="id" label={'Sample Id'}/>
                    {/*<NumberField source="batch.id" />*/}
                    <TextField source="patient.name" label={"Patient"} />
                    <TextField source="patient.mobile" label={"Patient mobile"} />
                    <DateField source="created" label={"Sample Date"}  options={{year: 'numeric', month: 'long', day: 'numeric' }} />
                    <TextField source="sample_type" label={"Sample Type"} />
                    <TextField source="operator_detail.name" label={"Operator Name"}/>
                    <MaterialShowButton/>
                    {/*{permissions === 'admin' ? <DeleteButton label={''} undoable={false}/> : null }*/}
                    {/*<EditButton/>*/}
                </Datagrid>
            </List>
);
