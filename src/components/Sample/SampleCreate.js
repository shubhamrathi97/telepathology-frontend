import React, {useEffect, useState} from 'react';
import {
    Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, DateInput, ArrayInput, DisabledInput,
    SimpleFormIterator, TabbedForm, FormTab, ImageField, FunctionField, required
} from 'react-admin'
import {Button, Typography, Dialog, AppBar, Toolbar, IconButton, Paper, makeStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {WebCamComponent} from "../WebCam";
import config from '../../config';
import {GenderField} from '../common/GenderField';
import {HiddenInput} from "../common/CustomButton";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    webCamPaper: {
        width: '100%',
        height: '100%'
    },
    inlineBlock: {
        display: 'inline-flex',
        marginRight: '1rem'
    },
    imageContainer: {
        display: 'flex'
    },
    displayImage: {
        width: '200px',
        height: '150px',
        marginRight: '5px',
    },
    scrollerImageContainer: {
        overflowX: 'auto',
        overflowY: 'hidden',
        // display: 'inline-flex'
    },
    imageCaptureButton: {
        // display: 'inline-flex',
        // height: '50px'
    }

}));

const ImageView = ({...props}) => {
    const {images} = props;
    const classes = useStyles();
    return (
        <div className={classes.imageContainer}>
            {images.map(val => (
                <Paper>
                    <img className={classes.displayImage} src={val.url ? val.base64 : '/asset/loader.svg'}/>
                </Paper>
            ))}
        </div>
    )
};

export const SampleCreate = ({permissions, ...props}) => {
    const [imgs, setImgs] = useState([]);
    const [imgsUrl, setImgsUrl] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        let temp = [];
        imgs.forEach(img => {
            let tempImg = {...img};
            delete tempImg['base64'];
            temp.push(tempImg)
        });
        setImgsUrl(temp)
    }, [imgs]);

    const handleClose = () => {
        setOpenDialog(false)
    };

    const handleOpen = () => {
        setOpenDialog(true)
    };

    const handleImages = () => {
        handleClose();
        let temp = [...imgs];
        temp.map((img, i) => {
            img.loading = true;
            uploadImage(img, i);
            return img
        });
        setImgs(temp);
    };

    const uploadImage = async (img, i) => {
        img.loading = true;
        fetch(config.djangoServerURL + '/images/upload_image/', {
            method: 'POST',
            body: JSON.stringify(img),
            headers: {
                'content-type': 'application/json'
            }
        }).then(
            res => res.json()
        ).then(res => {
            if (res.result === 'success') {
                img.url = res.data.url
            }
            img.loading = false;
            let temp = [...imgs];
            temp[i] = img;
            setImgs(temp);
            return img
        })
    };

    return (
        <Paper>
            <Dialog fullScreen open={openDialog} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Microscope Camera
                        </Typography>
                        <Button color="secondary" variant={"contained"} onClick={handleImages}>
                            Add Images
                        </Button>
                    </Toolbar>
                </AppBar>
                <Paper>
                    <WebCamComponent imgs={imgs} setImgs={setImgs}/>
                </Paper>
            </Dialog>

            <Create {...props} title={"Add Sample"} >
                <SimpleForm redirect={'show'}>

                    <TextInput source="patient.name" label={"Name"} formClassName={classes.inlineBlock}
                               validate={required()}/>
                    <NumberInput source="patient.age" label={"Age"} formClassName={classes.inlineBlock}/>
                    <TextInput source="patient.mobile" label={"Mobile"} formClassName={classes.inlineBlock}
                               validate={required()}/>
                    <GenderField source="patient.gender" label={"Gender"} formClassName={classes.inlineBlock}/>

                    <TextInput source="patient.address.address_line_1" label={"Address"}
                               formClassName={classes.inlineBlock}/>
                     <SelectInput choices={[
                        {id: 'blood', name: "Blood"},
                        {id: 'urine', name: "Urine"},
                    ]} source="sample_type" validate={required()} formClassName={classes.inlineBlock}/>
                    <Button variant={"outlined"} color={"primary"} onClick={handleOpen} formClassName={classes.imageCaptureButton}>
                        Capture Image from Microscope
                    </Button>
                    <ArrayInput source="batch.images" defaultValue={imgsUrl} label={"Images"} validate={required()}
                                formClassName={classes.scrollerImageContainer}>
                        <ImageView images={imgs}/>
                    </ArrayInput>
                    {permissions === 'admin' ?
                        <ReferenceInput source="operator_id" reference="operator" allowEmpty validate={required()}>
                            <SelectInput optionText="name" formClassName={classes.inlineBlock}/>
                        </ReferenceInput> :
                        <HiddenInput>
                            <DisabledInput source="operator_id" defaultValue={JSON.parse(localStorage.getItem('user')).id}
                                           validate={required()}/>
                        </HiddenInput>
                    }
                </SimpleForm>
            </Create>
        </Paper>
    );
}
