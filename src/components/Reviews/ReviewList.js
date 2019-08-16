import React from 'react';
import {List, Datagrid, TextField, EmailField, BooleanField, NumberField, DateField, ReferenceField, ShowButton,
Filter, TextInput, BooleanInput, RefreshButton, ExportButton, Button, Link, BulkDeleteButton } from 'react-admin';
import {CardActions} from "@material-ui/core";
import ChatBubbleIcon from "@material-ui/core/SvgIcon/SvgIcon";

const ReviewFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="search" alwaysOn={true}/>
        <BooleanInput label={"Review Again"} source={"again_review"} alwaysOn={false}/>
        <BooleanInput label={"Images unclear"} source={"images_unclear"} alwaysOn={false}/>
        {/*<DateInput label="Sample Date" source="created" />*/}
        {/*<ReferenceInput label="User" source="userId" reference="users" allowEmpty>*/}
        {/*    <SelectInput optionText="name" />*/}
        {/*</ReferenceInput>*/}
    </Filter>
);

const CustomShowButton = ({ record }) => {
    if(record){
        return (<Button
            component={Link}
            to={{
                pathname: `/sample/sample/${record.sample_id}/show/review`,
            }}
            label="Show"
        >
        </Button> )
    }
    return null
};


const ReviewActions = ({
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
                         total
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
        <ExportButton
            disabled={total === 0}
            resource={resource}
            sort={currentSort}
            filter={filterValues}
            exporter={exporter}
        />
        <RefreshButton />
    </CardActions>
);

export const ReviewList = (props) =>{
    const {permissions} = props;
    console.log(permissions === 'doctor');
    return (
    <List {...props}
          filters={<ReviewFilter/>}
          actions={<ReviewActions/>}
          filter={{doctor: true}}
          title={"Reviews"}
          bulkActionButtons={permissions === 'admin' ? <BulkDeleteButton/> : false}
    >
        <Datagrid>
            <NumberField source="sample_detail.id" label={"Sample ID"}/>
            <TextField source="sample_detail.patient.name" label={"Patient Name"}/>
            <TextField source="review" />
            <BooleanField source="again_review" label={'Review again'} />
            <BooleanField source="images_unclear" label={'Unclear Image'}/>
            <NumberField source="doctor_detail.name" label={'Doctor Name'}/>
            <DateField source="created" label={'Review Date'}/>
            <CustomShowButton/>
        </Datagrid>
    </List>
)};
