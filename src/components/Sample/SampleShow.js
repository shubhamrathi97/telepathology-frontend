import React, {useState} from 'react';
import {
    Show, SimpleShowLayout, TextField, NumberField, DateField, ReferenceField, Link, ListButton,
    RefreshButton, TabbedShowLayout, Tab, ReferenceManyField, Datagrid, BooleanField,
    Create, SimpleForm, DisabledInput, BooleanInput, TextInput, required
} from 'react-admin';
import {ImageViewer} from "./Gallery";
import {CardActions, makeStyles, Typography, Divider, Card, Button} from '@material-ui/core';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import {HiddenInput} from "../common/CustomButton";
import SampleReviewCreate from "./SampleReviewCreate";

const AddNewReviewButton = ({record}) => {
    if (record) {
        return (<Button
            component={Link}
            to={{
                pathname: '/sample/review/create',
                search: `?sample=${record.id}`
            }}
            label="Add Review"
        >
            <ChatBubbleIcon/>
        </Button>)
    }
    return null
};

const SampleShowActions = ({basePath, data, permissions, className}) => (
    <CardActions className={className}>
        <ListButton basePath={basePath}/>
        <RefreshButton/>
        {permissions != 'operator' ? <AddNewReviewButton record={data}/> : null}
    </CardActions>
);

const styles = makeStyles(theme => ({
    labelStyle: {
        display:'inline-flex',
        '& div': {
            display: 'inline'
        },
        '& label': {
            display: 'inline',
            textTransform: 'capitalize',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '18px',
        },
        '& label::after': {
            content: ':'
        },
        '& span': {
            display: 'inline',
            textTransform: 'capitalize',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '18px',
            verticalAlign: 'middle',
            padding: '5px'
        }
    },
    labelWidth45: {
        width: '45%',
        margin: '5px 5px 5px 0',
    },
    actionBar: {
        justifyContent: 'flex-end'
    },
    imageFieldStyle: {
        display: 'block',
        '& div': {
            display: 'block'
        }
    },
    reviewBox: {
        width: '600px'
    }
}));

export const SampleShow = ({permissions, ...props}) => {
    const classes = styles();
    return (
        <Show {...props}
              // actions={<SampleShowActions permissions={permissions} className={classes.actionBar}/>}
              title={"Sample Details"}>
            <SimpleShowLayout>
                <Typography variant={'h6'}>
                    Patient Detail
                </Typography>
                <Divider/>
                <TextField source="patient.name" label={'Name'} className={[classes.labelStyle, classes.labelWidth45]}/>
                <TextField source="patient.age" label={'Age'} className={[classes.labelStyle, classes.labelWidth45]}/>
                <TextField source="patient.gender" label={"Gender"} className={[classes.labelStyle, classes.labelWidth45]}/>
                <TextField source="patient.mobile" label={"Mobile"} className={[classes.labelStyle, classes.labelWidth45]}/>
                {/*<TextField source="operator_id"  label={'Patient Registered by Operator'} className={classes.labelStyle} />*/}
                <Typography variant={'h6'}>
                    Sample Detail
                </Typography>
                <Divider/>
                <DateField source="created" label={'Sample Collection Date'} className={[classes.labelStyle, classes.labelWidth45]}
                           options={{year: 'numeric', month: 'long', day: 'numeric'}}/>
                <TextField source="sample_type" label={'Sample Type'} className={[classes.labelStyle, classes.labelWidth45]}/>
                <ImageViewer source="batch" label={'Sample Images'} className={[classes.labelStyle,classes.imageFieldStyle]}/>
                <Divider/>
                <ReferenceManyField
                    label={"Doctors Review"}
                    reference="sample/review"
                    target="sample_id"
                    sort={{field: "created", order: "DESC"}}
                >
                    <Datagrid>
                        <DateField source="created" labal={'Review Date'} options={{year: 'numeric', month: 'long', day: 'numeric'}}/>
                        <TextField source="doctor_detail.name" label={"Doctor name"}/>
                        <TextField source="review" label={"Doctor's Review"}/>
                        <BooleanField source="again_review" label={"Need to review again"}/>
                        <BooleanField source="images_unclear" label={"Images are not clear"}/>
                        {/*<EditButton />*/}
                    </Datagrid>
                </ReferenceManyField>
                {/*{permissions !== 'operator' ? <AddNewReviewButton/> : null}*/}
                <SampleReviewCreate className={classes.reviewBox}/>

            </SimpleShowLayout>
        </Show>
    );
};
