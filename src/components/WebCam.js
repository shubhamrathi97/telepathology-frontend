import React, {useState} from 'react';
import Webcam from "react-webcam";
import Camera, {FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import {Card, withStyles, Button, CardMedia, Paper} from '@material-ui/core';

const style = {
    displayImage: { width: '150px',
                height:'150px',
                margin: '5px'
    },
    imgBox: {
        display: 'inline-block',
        textAlign: 'center'
    }
};

export const WebCamComponent  = withStyles(style)(({classes, ...props}) => {
    let [imgs, setImgs] = useState([]);

    if(props.imgs && props.setImgs){
        imgs = props.imgs;
        setImgs = props.setImgs;
    }

    const onTakePhoto = (dataUri) => {
        // Do stuff with the photo...
        // console.log('takePhoto', dataUri);
        let temp = [...imgs];
        temp.push({'base64':dataUri});
        setImgs(temp);
    };

    const onRemove = (index) => {
        let temp = [...imgs];
        temp.splice(index, 1);
        setImgs(temp);
    };

    const onCameraError = (error) => {
        console.error('onCameraError', error);
    };


    return (
        <Paper>
            {/*<Webcam*/}
            {/*    videoConstraints={videoConstraints}*/}
            {/*/>*/}
            <Camera
                idealFacingMode = {FACING_MODES.ENVIRONMENT}
                // idealResolution = {{width: 640, height: 480}}

                imageType = {IMAGE_TYPES.PNG}
                imageCompression = {1}
                isMaxResolution = {false}
                // isFullscreen={true}
                isImageMirror = {false}
                isSilentMode = {true}
                isDisplayStartCameraError = {true}
                // isFullscreen = {true}
                onTakePhoto = { (dataUri) => { onTakePhoto(dataUri); } }
                onCameraError = { (error) => { onCameraError(error); } }
                sizeFactor = {1}
                />
            {imgs.map((imgVal, i) => (
                <Card className={classes.imgBox}>
                    <CardMedia image={imgVal.base64} className={classes.displayImage} />
                    <Button variant={"text"}  color={"primary"} onClick={() => onRemove(i)}>Delete</Button>
                </Card>
            ))}
        </Paper>
    )
});
