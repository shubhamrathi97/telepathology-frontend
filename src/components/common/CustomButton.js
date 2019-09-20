import React from 'react';
import {ShowButton, EditButton, CreateButton, RefreshButton} from 'react-admin';
import {CardActions, makeStyles} from "@material-ui/core";

const buttonStyle = makeStyles(theme => ({
    showButtonStyle: {
        color: 'blue',
        border: '1px blue solid'
        // backgroundColor: 'red',
    },
    createButtonStyle: {
        backgroundColor: 'orangered',
        color: 'white'
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

export const MaterialCreateButton = (props) => {
    const style = buttonStyle();
    return (
        <CreateButton {...props} variant={'contained'} color={'secondary'}  />
    )
};

export const CustomActions = ({
                           bulkActions,
                           basePath,
                           currentSort,
                           displayedFilters,
                           exporter,
                           filters,
                           filterValues,
                           onUnselectItems,
                           resource,
                           selectedIds,
                           showFilter,
                           total
                       }) => (
    <CardActions>
        {bulkActions && React.cloneElement(bulkActions, {
            basePath,
            filterValues,
            resource,
            selectedIds,
            onUnselectItems,
        })}
        {filters && React.cloneElement(filters, {
            resource,
            showFilter,
            displayedFilters,
            filterValues,
            context: 'button',
        }) }
        <RefreshButton />
        <MaterialCreateButton basePath={basePath} />
    </CardActions>
);

export const HiddenInput = (props) => {
    return (
        <div style={{'display': 'none'}}>
            {props.children}
        </div>
    )
};
