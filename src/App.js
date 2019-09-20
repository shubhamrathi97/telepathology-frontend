import React from 'react';
import './App.css';
import customRoute from './customRoute';
import {CustomLayout} from './components/layout';
import drfProvider from './restProvider';
import {getResource} from "./Resources";
import authProvider from "./authProvider";
import {Admin, Login} from 'react-admin'
import config from './config';
// import JssProvider from 'react-jss/lib/JssProvider';
// import { createGenerateClassName } from '@material-ui/core/styles';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';

const dataProvider = drfProvider(config.djangoServerURL);
// console.log(process.env.PUBLIC_URL);
const CustomLoginPage = () => {return (<Login backgroundImage={process.env.PUBLIC_URL + '/asset/microscope.jpg'} />)};

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: 'c',
});

function App() {
  return (
      <StylesProvider generateClassName={generateClassName}>
      <Admin
          // title={JSON.parse(localStorage.getItem('hospital')).name}
          appLayout={CustomLayout}
          dataProvider={dataProvider}
          loginPage={CustomLoginPage}
          // dashboard={Dashboard}
          authProvider={authProvider}
          // customRoutes={customRoute}
      >
          {getResource}
      </Admin>
      </StylesProvider>
  );
}

export default App;
