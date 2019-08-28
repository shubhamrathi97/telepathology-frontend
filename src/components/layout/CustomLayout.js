import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
// import {AppBar} from '@material-ui/core';
import {withStyles, MuiThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import MyMenu from './Menu';
import {
    Menu,
    Notification,
    Sidebar,
    setSidebarVisibility,
    AppBar
} from 'react-admin';

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing.unit * 3,
        // marginTop: '4em',
        paddingLeft: 5,
    },
    contentParent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    appbarStyle: {
        'position':'relative',
        'height':'50px'
    },
    sideBarStyle: {
        color: '#6c757d',
        backgroundColor: '#343a40',
        height: '100vh',
        marginRight: '15px'
    },
    menuStyle: {
        color: '#6c757d',
        '& a': {
            margin: '10px 5px 0',
            color: '#fff',
            textDecoration: 'none',
            position: 'relative',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '10px 8px',
            opacity: '.7',
            // backgroundColor: '#343a40'
        },
        '& a:hover': {
            opacity: '1'
        }
    }
}));

const CustomLayout = (props) => {
    useEffect( () => {props.setSidebarVisibility(true)} , []);
    const classes = styles();
    const {
        children,
        dashboard,
        isLoading,
        logout,
        open,
        title,
    } = props;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar title={title} open={open} logout={logout} className={classes.appbarStyle}/>
                    <main className={classes.contentWithSidebar}>
                        <Sidebar className={classes.sideBarStyle}>
                            <MyMenu logout={logout} hasDashboard={!!dashboard} className={classes.menuStyle} />
                        </Sidebar>
                        <div className={classes.contentParent}>
                            <div className={classes.content}>
                                {children}
                            </div>
                        </div>
                    </main>
                    <Notification />
                </div>
            </div>
        );
    };


const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });
export default connect(mapStateToProps, { setSidebarVisibility })(CustomLayout);
