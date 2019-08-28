import React from 'react';
import {Create, SimpleForm, TextInput, ReferenceInput, SelectInput, BooleanInput, required, DisabledInput} from 'react-admin'
import { parse } from "query-string";

export const ReviewCreate = ({permissions, ...props}) => {
    const { sample: sample_id_string } = parse(props.location.search);
    const sample_id = sample_id_string ? parseInt(sample_id_string, 10) : '';
    const redirect = sample_id ? `/sample/sample/${sample_id}/show` : 'show';


    return (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            {permissions === 'admin' ?
            <ReferenceInput source="sample_id" reference="sample/sample"
                            validate={required()} defaultValue={sample_id}>
                <SelectInput optionText={(record) => (record.patient ? record.patient.name : record.id)} />
            </ReferenceInput> :
                <DisabledInput source="sample_id" validate={required()} defaultValue={sample_id}/>
            }
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
    </Create>
)
};
