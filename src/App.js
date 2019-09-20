import React from 'react';
import './App.css';
import customRoute from './customRoute';
import {CustomLayout} from './components/layout';
import drfProvider from './restProvider';
import {getResource} from "./Resources";
import authProvider from "./authProvider";
import {Admin, Login} from 'react-admin'
import config from './config';
import {createMuiTheme} from "@material-ui/core";
import {red, indigo, pink} from '@material-ui/core/colors';

const dataProvider = drfProvider(config.djangoServerURL);
console.log(process.env.PUBLIC_URL);
const CustomLoginPage = () => {return (<Login backgroundImage={process.env.PUBLIC_URL + '/asset/microscope.jpg'} />)};

function App() {
  return (
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
  );
}

export default App;
