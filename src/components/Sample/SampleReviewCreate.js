import {HiddenInput} from "../common/CustomButton";
import {CREATE, showNotification, withDataProvider} from 'react-admin';
import {Paper, Button, TextField, Checkbox, FormControlLabel, FormGroup, makeStyles} from "@material-ui/core";
import React from "react";


const styles = makeStyles(theme => ({
   reviewCard: {
       padding: '5px 20px',
       boxShadow: '0px 2px 8px black'
   },
   inlineField: {
       display: 'inline-flex',
       marginRight: '10px'
   },
   reviewButton: {
       width: '150px',
       height: '30px',
       verticalAlign: 'baseline'
   }
}));

const SampleReviewCreate = (props) => {
    const {dispatch, dataProvider, source, record = {}} = props;
    const [values, setValues] = React.useState({
        'sample_id': record.id,'doctor_id':JSON.parse(localStorage.getItem('user')).id
    });
    const classes = styles();

    const handleSubmit = () => {
        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        dataProvider(CREATE, 'sample/review', {data: values}, {
            onSuccess: {
                notification: {body : 'Review Added', level: 'info'},
                refresh: true
            },
            onError: {
                notification: { body: 'Error: review not added', level: 'warning' }
            }
        })
    };

    const onChange = event => {
        let nw = {...values};
        if(['again_review', 'images_unclear'].includes(event.target.name)){
            nw[event.target.name] = event.target.checked;
        }else{
            nw[event.target.name] = event.target.value;
        }
        setValues(nw);
        console.log(values)
    };

    return (
        <Paper className={[classes.reviewCard, props.className]}>
            <TextField value={values.review} name={'review'} onChange={onChange} label={"Review"}
                       fullWidth={true} placeholder={'Write review of Sample'}/>
            <FormGroup className={classes.inlineField}>
                <FormControlLabel
                    control={<Checkbox checked={values.again_review} onChange={onChange} name={'again_review'} />}
                    label="Review Again"
                />
            </FormGroup>
            <FormGroup className={classes.inlineField}>
                <FormControlLabel
                    control={<Checkbox checked={values.images_unclear} onChange={onChange} name={'images_unclear'} />}
                    label="Images are not Clear"
                />
            </FormGroup>
            {values.review ?
            <Button onClick={handleSubmit} className={classes.reviewButton} color={'primary'} variant={'contained'}>
                Add Review
            </Button> : null }
        </Paper>
    )
};

export default withDataProvider(SampleReviewCreate)
