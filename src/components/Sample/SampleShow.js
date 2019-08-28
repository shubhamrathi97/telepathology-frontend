import React, {useState} from 'react';
import {Show, SimpleShowLayout, TextField, NumberField, DateField, ReferenceField, Button, Link, ListButton,
    RefreshButton, TabbedShowLayout, Tab, ReferenceManyField, Datagrid, BooleanField } from 'react-admin';
import {ImageViewer} from "./Gallery";
import {CardActions, makeStyles, Typography, Divider} from '@material-ui/core';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";


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

const SampleShowActions = ({ basePath, data, permissions, className }) => (
    <CardActions className={className}>
        <ListButton basePath={basePath} />
        <RefreshButton />
        {permissions != 'operator' ? <AddNewReviewButton record={data} />: null}
    </CardActions>
);

const styles = makeStyles(theme => ({
    labelStyle: {
        margin: '10px 10px 10px 0',
        '& div': {
            display: 'inline'
        },
        '& label': {
            display: 'inline',
            textTransform: 'capitalize',
            fontSize: '16px',
            fontWeight: '400',
        },
        '& label::after':{
            content: ':'
        },
        '& span': {
            display: 'inline',
            textTransform: 'capitalize',
            fontSize: '16px',
            fontWeight: '400',
            padding: '5px'
        }
    },
    actionBar: {
        justifyContent: 'flex-end'
    }
}));

export const SampleShow = ({permissions, ...props}) => {
    const classes = styles();
    return(
        <Show {...props} actions={<SampleShowActions permissions={permissions} className={classes.actionBar}/>} title={"Sample Details"}>
            <TabbedShowLayout>
                <Tab label={'sample details'}>
                    <DateField source="created" label={'Sample Collection Date'} className={classes.labelStyle}  options={{year: 'numeric', month: 'long', day: 'numeric' }} />
                    <TextField source="sample_type" label={'Sample Type'} className={classes.labelStyle}/>
                    <ImageViewer source="batch" label={'Sample Images'} className={classes.labelStyle}/>
                    <Divider/>
                    <ReferenceManyField
                        label={"Doctors Review"}
                        reference="sample/review"
                        target="sample_id"
                        sort={{ field: "created", order: "DESC" }}
                        className={classes.labelStyle}
                    >
                        <Datagrid>
                            <DateField source="created"  options={{year: 'numeric', month: 'long', day: 'numeric' }} />
                            <TextField source="doctor_detail.name" label={"Doctor name"}/>
                            <TextField source="review" label={"Doctor's Review"}/>
                            <BooleanField source="again_review" label={"Need to review again"}/>
                            <BooleanField source="images_unclear" label={"Images are not clear"}/>
                            {/*<EditButton />*/}
                        </Datagrid>
                    </ReferenceManyField>
                    {permissions !== 'operator' ? <AddNewReviewButton /> : null}
                </Tab>
                <Tab label={'Patient Details'}>
                    <TextField source="patient.name" label={'Patient Name'} className={classes.labelStyle}/>
                    <TextField source="patient.age" label={'Patient Age'} className={classes.labelStyle}/>
                    <TextField source="patient.gender" label={"Patient Gender"} className={classes.labelStyle}/>
                    <TextField source="patient.mobile" label={"Patient Mobile"} className={classes.labelStyle}/>
                    <TextField source="operator_id"  label={'Patient Registered by Operator'} className={classes.labelStyle} />
                </Tab>
                {/*<Tab label={'Reviews'} path={"review"}>*/}
                {/*    <ReferenceManyField*/}
                {/*        addLabel={false}*/}
                {/*        reference="sample/review"*/}
                {/*        target="sample_id"*/}
                {/*        sort={{ field: "created", order: "DESC" }}*/}
                {/*    >*/}
                {/*        <Datagrid>*/}
                {/*            <DateField source="created" />*/}
                {/*            <TextField source="review" label={"Doctor's Review"}/>*/}
                {/*            <BooleanField source="again_review" label={"Need to review again"}/>*/}
                {/*            <BooleanField source="images_unclear" label={"Images are not clear"}/>*/}
                {/*            <TextField source="doctor_detail.name" label={"doctor name"}/>*/}
                {/*            /!*<EditButton />*!/*/}
                {/*        </Datagrid>*/}
                {/*    </ReferenceManyField>*/}
                {/*    {permissions != 'operator' ? <AddNewReviewButton /> : null}*/}
                {/*</Tab>*/}
            </TabbedShowLayout>
        </Show>
    );
};
