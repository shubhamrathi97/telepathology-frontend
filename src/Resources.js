import React from "react";
import {Resource, ShowGuesser, EditGuesser, ListGuesser} from "react-admin";
import {People, LocalHospital, CameraEnhance, Chat} from "@material-ui/icons";
import {OperatorList, OperatorEdit, OperatorCreate} from "./components/Operator";
import {DoctorEdit, DoctorCreate, DoctorList} from "./components/Doctor";
import {SampleList, SampleCreate, SampleShow} from "./components/Sample";
import {ReviewList, ReviewCreate, ReviewEdit} from "./components/Reviews";

const admin = {
    operator: {
        // create: ,
        list: OperatorList,
        edit: OperatorEdit,
        create: OperatorCreate,
        icon: People
    },
    doctor:{
        create: DoctorCreate,
        list: DoctorList,
        edit: DoctorEdit,
        // show: ShowGuesser,
        icon: LocalHospital
    },
    'sample/sample': {
        list: SampleList,
        show: SampleShow,
        create: SampleCreate,
        options: {label: 'Sample'},
        icon: CameraEnhance
    },
    'sample/review': {
        list: ReviewList,
        // show: ShowGuesser,
        edit: ReviewEdit,
        create: ReviewCreate,
        options: {label: 'Reviews'},
        icon: Chat
    },
    // 'sample/comment': {
    //     list: ListGuesser,
    //     show: ShowGuesser,
    //     edit: EditGuesser
    // }
};

const operator = {
    'sample/sample': {
        list: SampleList,
        show: SampleShow,
        create: SampleCreate,
        options: {label: 'Sample'},
        icon: CameraEnhance
    },
    operator: {
        // create: ,
        icon: People
    },
    doctor:{
        icon: LocalHospital
    },
    'sample/review': {
        options: {label: 'Reviews'},
        icon: Chat
    }
};

const doctor = {
    'sample/sample': {
        list: SampleList,
        show: SampleShow,
        // create: SampleCreate,
        options: {label: 'Sample'},
        icon: CameraEnhance
    },
    operator: {
        // create: ,
        // list: OperatorList,
        // edit: OperatorEdit,
        // create: OperatorCreate,
        icon: People
    },
    doctor:{
        // create: DoctorCreate,
        // list: DoctorList,
        // edit: DoctorEdit,
        // show: ShowGuesser,
        icon: LocalHospital
    },

    'sample/review': {
        list: ReviewList,
        // show: ShowGuesser,
        // edit: ReviewEdit,
        create: ReviewCreate,
        options: {label: 'My Reviews'},
        icon: Chat
    },
    // 'sample/comment': {
    //     list: ListGuesser,
    //     show: ShowGuesser,
    //     edit: EditGuesser
    // }
};

const getModule = (permissions) => {
    if(permissions === 'admin'){
        return admin
    }else if(permissions === 'doctor'){
        return doctor
    }else if(permissions === 'operator'){
        return operator
    }
};

export const getResource = (permissions) => {
    const modules = getModule(permissions);
    let resources = [];

    Object.keys(modules).map(key => {
        resources.push(<Resource name={key} {...(modules[key])}/>)
    });

    return resources;
};
