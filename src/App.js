import React from 'react';
import './App.css';
import customRoute from './customRoute';
import drfProvider from './restProvider';
import {getResource} from "./Resources";
import authProvider from "./authProvider";
import {Admin} from 'react-admin'
import config from './config';

const dataProvider = drfProvider(config.djangoServerURL);

function App() {
  return (
      <Admin
          // title={JSON.parse(localStorage.getItem('hospital')).name}
          // appLayout={CustomLayout}
          dataProvider={dataProvider}
          // dashboard={Dashboard}
          authProvider={authProvider}
          // customRoutes={customRoute}
      >
          {getResource}
      </Admin>
  );
}

export default App;
