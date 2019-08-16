import React, {useEffect, useState} from 'react';
import {Edit, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, DateInput, ArrayInput, DisabledInput,
    SimpleFormIterator, TabbedForm, FormTab, ImageField, FunctionField, BooleanInput, required} from 'react-admin'
import {Button, Typography, Dialog, AppBar, Toolbar, IconButton, Paper, makeStyles} from "@material-ui/core";

export const ReviewEdit = ({permissions, ...props}) => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <DisabledInput source="sample_id" reference="sample/sample"/>
            {permissions === 'admin' ?
                <ReferenceInput source="doctor_id" reference="doctor" validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput> :
                <DisabledInput source="doctor_id" defaultValue={JSON.parse(localStorage.getItem('user')).id}/>
            }
            <TextInput source="review" validate={required()}/>
            <BooleanInput source="again_review" />
            <BooleanInput source="images_unclear" />
        </SimpleForm>
    </Edit>
);
