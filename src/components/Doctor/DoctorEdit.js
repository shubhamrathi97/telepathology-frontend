import React from 'react';
import {Edit, Create, SimpleForm, TextInput, ReferenceInput, SelectInput, BooleanInput, required, DateInput,
    DisabledInput, NumberInput} from 'react-admin'
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {GenderField} from "../common/GenderField";

const useStyles = makeStyles(theme => ({
    inlineBlock: {
        display: 'block',
        marginRight: '1rem'
    }
}));

export const DoctorEdit = props => {
    const classes = useStyles();

    return (
        <Edit {...props} undoable={false}>
            <SimpleForm redirect={'list'}>
                <Typography variant={'h5'}>
                    Doctor Details
                </Typography>
                <TextInput source="name"  formClassName={classes.inlineBlock} validate={required()}/>
                <TextInput source="email" formClassName={classes.inlineBlock} validate={required()}/>
                <TextInput source="mobile" formClassName={classes.inlineBlock} validate={required()}/>
                <GenderField source="gender" formClassName={classes.inlineBlock} validate={required()}/>
                <DateInput source="dob" formClassName={classes.inlineBlock} />
                <TextInput source="degree" formClassName={classes.inlineBlock}/>
                <DisabledInput source="type" defaultValue={'doctor'} formClassName={classes.inlineBlock}/>
                {/*<Typography variant={'h6'}>*/}
                {/*    Operator Address*/}
                {/*</Typography>*/}
                {/*<TextInput source="patient.address.address_line_1" label={"House Number"} formClassName={classes.inlineBlock}/>*/}
                {/*<TextInput source="patient.address.address_line_2" label={"Colony/ Street"} formClassName={classes.inlineBlock}/>*/}
                {/*<TextInput source="patient.address.address_line_3" label={"Area"} formClassName={classes.inlineBlock}/>*/}
                {/*<NumberInput source="patient.address.pincode" label={"Pincode"} formClassName={classes.inlineBlock}/>*/}
                {/*<TextInput source="patient.address.city" label={"City"} formClassName={classes.inlineBlock}/>*/}
                {/*<TextInput source="patient.address.state" label={"State"} formClassName={classes.inlineBlock}/>*/}
            </SimpleForm>
        </Edit>
    );
}
