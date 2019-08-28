import React from 'react';
import {ShowButton, EditButton} from 'react-admin';
import {makeStyles} from "@material-ui/core";

const buttonStyle = makeStyles(theme => ({
    showButtonStyle: {
        color: 'blue',
        border: '1px blue solid'
        // backgroundColor: 'red',
    }
}));

export const MaterialShowButton = (props) => {
    const style = buttonStyle();
    return(
        <ShowButton {...props} variant={'outlined'} className={style.showButtonStyle} label={'View'}/>
    )
};

export const MaterialEditButton = (props) => {
    return (
        <EditButton {...props}/>
    )
};
