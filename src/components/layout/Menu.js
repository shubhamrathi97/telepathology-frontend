import React, {createElement} from 'react';
import { connect } from 'react-redux';
import { MenuItemLink, getResources, Responsive } from 'react-admin';
import {ListItem, Collapse, List, makeStyles, Typography} from "@material-ui/core";
import { withRouter } from 'react-router-dom';

const MenuStyle = makeStyles(theme => ({
    listItemStyle: {
        paddingTop: '0',
        paddingBottom: '0'
    },
    menuItemStyle: {
        width: '100%'
    },
    logoImg: {
        width: '100px',
        height: '100px',
        display: 'block',
        margin: 'auto',
    },
    logoContainer: {
        textAlign: 'center',
        borderRadius: '50%',
        width: '100px',
        padding: '10%',
        margin: 'auto',
        height: '100px',
        backgroundColor: 'white',
    },
    sidebarBrand: {
        textAlign: 'center',
        color: 'white'
    }
}));

const SampleMenu = (props) => {
    const { resource, onMenuClick, className='' } = props;
    const style = MenuStyle();
    const [open, setOpen] = React.useState(true);

    function handleClick() {
        setOpen(!open);
    }

    return (
        <React.Fragment>
            <React.Fragment>
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={resource.options && resource.options.label || resource.name}
                    leftIcon={createElement(resource.icon)}
                    // onClick={handleClick}
                />
            </React.Fragment>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {/*<ListItem className={style.listItemStyle}>*/}
                    {/*<MenuItemLink*/}
                    {/*    key={`All ${resource.name}`}*/}
                    {/*    to={`/${resource.name}`}*/}
                    {/*    primaryText={'All'}*/}
                    {/*    // leftIcon={createElement(resource.icon)}*/}
                    {/*    onClick={onMenuClick}*/}
                    {/*    className={style.menuItemStyle}*/}
                    {/*/></ListItem>*/}
                    <ListItem className={style.listItemStyle}>
                        <MenuItemLink
                            key={`Reviewed ${resource.name}`}
                            to={`/${resource.name}?filter=%7B"reviewed"%3Afalse%7D`}
                            primaryText={'Unreviewed Sample'}
                            onClick={onMenuClick}
                            className={style.menuItemStyle}
                        />
                    </ListItem>
                    <ListItem className={style.listItemStyle}>
                        <MenuItemLink
                            key={`Reviewed ${resource.name}`}
                            to={`/${resource.name}?filter=%7B"reviewed"%3Atrue%7D`}
                            primaryText={'Reviewed Sample'}
                            onClick={onMenuClick}
                            className={style.menuItemStyle}
                        />
                    </ListItem>
                </List>
            </Collapse>
        </React.Fragment>
    )
};

const MyMenu = (props) => {
    const { resources, onMenuClick, logout, className='' } = props;
    const classes = MenuStyle();

    return (
        <div className={className}>
            <div className={classes.sidebarBrand}>
            <div className={classes.logoContainer}>
                <img src={'/asset/microscope.svg'} className={classes.logoImg}/>
            </div>
            <Typography variant={"h6"}>
                Telepathology
            </Typography>
            </div>
            {resources.map(resource => {
                if(resource.hasList){
                    if(resource.name === 'sample/sample'){
                        return (
                            <SampleMenu {...props} resource={resource}/>
                        )
                    }
                    return (
                        <MenuItemLink
                            key={resource.name}
                            to={`/${resource.name}`}
                            primaryText={resource.options && resource.options.label || resource.name}
                            leftIcon={createElement(resource.icon)}
                            onClick={onMenuClick}
                        />
                    )
                }
            })}
            {/*{logout}*/}
            {/*<MenuItemLink to="/custom-route" primaryText="Miscellaneous" onClick={onMenuClick} />*/}
            {/*<Responsive*/}
            {/*    small={logout}*/}
            {/*    medium={logout} // Pass null to render nothing on larger devices*/}
            {/*/>*/}
        </div>
    );
}

const mapStateToProps = state => ({
    resources: getResources(state),
});

export default withRouter(connect(mapStateToProps)(MyMenu));

