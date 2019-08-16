import React, {useState} from 'react';
import {Show, SimpleShowLayout, TextField, NumberField, DateField, ReferenceField, Button, Link, ListButton,
    RefreshButton, TabbedShowLayout, Tab, ReferenceManyField, Datagrid, BooleanField } from 'react-admin';
import {ImageViewer} from "./Gallery";
import CardActions from '@material-ui/core/CardActions';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import {BottomNavigation} from "@material-ui/core";

const AddNewReviewButton = ({ record }) => {
    if(record){
    return (<Button
        component={Link}
        to={{
            pathname: '/sample/review/create',
            search: `?sample=${record.id}`
        }}
        label="Add Review"
    >
        <ChatBubbleIcon />
    </Button> )
    }
    return null
};

const SampleShowActions = ({ basePath, data, permissions }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <RefreshButton />
        {permissions != 'operator' ? <AddNewReviewButton record={data} />: null}
    </CardActions>
);


export const SampleShow = ({permissions, ...props}) => (
    <Show {...props} actions={<SampleShowActions permissions={permissions}/>} title={"Sample Details"}>
        <TabbedShowLayout>
            <Tab label={'sample details'}>
            <DateField source="created" label={'Sample Date'} />
            <TextField source="sample_type" label={'Sample Type'}/>
            <TextField source="operator_id"  label={'Operator Reg. No.'} />
            <ImageViewer source="batch" />
            </Tab>
            <Tab label={'Patient Details'}>
                <TextField source="patient.name" label={'Patient Name'} />
                <TextField source="patient.age" label={'Patient Age'}/>
                <TextField source="patient.gender" label={"Patient Gender"}/>
                <TextField source="patient.mobile" label={"Patient Mobile"}/>
            </Tab>
            <Tab label={'Reviews'} path={"review"}>
                <ReferenceManyField
                    addLabel={false}
                    reference="sample/review"
                    target="sample_id"
                    sort={{ field: "created", order: "DESC" }}
                >
                    <Datagrid>
                        <DateField source="created" />
                        <TextField source="review" label={"Doctor's Review"}/>
                        <BooleanField source="again_review" label={"Need to review again"}/>
                        <BooleanField source="images_unclear" label={"Images are not clear"}/>
                        <TextField source="doctor_detail.name" label={"doctor name"}/>
                        {/*<EditButton />*/}
                    </Datagrid>
                </ReferenceManyField>
                {permissions != 'operator' ? <AddNewReviewButton /> : null}
            </Tab>
        </TabbedShowLayout>
    </Show>
);
