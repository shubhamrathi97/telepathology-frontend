import React, {useEffect, useState} from 'react';
import {Edit, Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, DateInput, ArrayInput, DisabledInput,
    SimpleFormIterator, TabbedForm, FormTab, ImageField, FunctionField} from 'react-admin'
import {Button, Typography, Dialog, AppBar, Toolbar, IconButton, Paper, makeStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {WebCamComponent} from "../WebCam";
import config from '../../config';

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
        height:'150px',
        marginRight: '5px',
    }
}));

const ImageView = ({...props}) => {
    const {images} = props;
    const classes = useStyles();
    return (
        <div className={classes.imageContainer}>
            {images.map(val => (
                <Paper>
                    <img className={classes.displayImage} src={val.url ? val.base64 : '/asset/loader.svg'} />
                </Paper>
            ))}
        </div>
    )
};

export const SampleCreate = props => {
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
        temp.map((img, i)=> {
            img.loading = true;
            uploadImage(img, i);
            return img
        });
        setImgs(temp);
    };

    const uploadImage = async (img, i) => {
        img.loading = true;
        fetch(config.djangoServerURL + '/images/upload_image/', {
            method:'POST',
            body: JSON.stringify(img),
            headers: {
                'content-type':'application/json'
            }
        }).then(
            res => res.json()
        ).then(res => {
            if(res.result === 'success') {
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
            <Dialog fullScreen open={openDialog} onClose={handleClose} >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
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

            <Create {...props} >
                <TabbedForm redirect={'show'}>
                    <FormTab label={"Microscope Images"}>
                        <Button variant={"outlined"} color={"primary"} onClick={handleOpen} fullWidth={true}>
                            Capture Image from Microscope
                        </Button>
                        <ArrayInput source="batch.images" defaultValue={imgsUrl} label={"Images"}>
                            <ImageView images={imgs}/>
                        </ArrayInput>
                        <TextInput source="sample_type"  label={"Sample type"}/>
                        <ReferenceInput source="operator_id" reference="operator">
                            <SelectInput optionText="name" />
                        </ReferenceInput>
                    </FormTab>
                    <FormTab label={"Patient Detail"}>
                        <TextInput source="patient.name" label={"Name"} formClassName={classes.inlineBlock}/>
                        <NumberInput source="patient.age" label={"Age"} formClassName={classes.inlineBlock}/>
                        <TextInput source="patient.mobile" label={"Mobile"} formClassName={classes.inlineBlock}/>
                        <TextInput source="patient.gender" label={"Gender"} formClassName={classes.inlineBlock}/>
                    </FormTab>
                    <FormTab label={"Patient Address"}>
                        <TextInput source="patient.address.address_line_1" label={"House Number"} formClassName={classes.inlineBlock}/>
                        <TextInput source="patient.address.address_line_2" label={"Colony/ Street"} formClassName={classes.inlineBlock}/>
                        <TextInput source="patient.address.address_line_3" label={"Area"} formClassName={classes.inlineBlock}/>
                        <NumberInput source="patient.address.pincode" label={"Pincode"} formClassName={classes.inlineBlock}/>
                        <TextInput source="patient.address.city" label={"City"} formClassName={classes.inlineBlock}/>
                        <TextInput source="patient.address.state" label={"State"} formClassName={classes.inlineBlock}/>
                    </FormTab>
                </TabbedForm>
            </Create>
        </Paper>
    );
}
