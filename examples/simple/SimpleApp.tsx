import React from 'react';
import  {MapView}  from '../../src/MapView';
import ReactDOM from 'react-dom';

const App =(props:any)=>{
    return (<MapView scene="scene.yaml" />)
}

const renderApp = (RootComponent: any) => {
    ReactDOM.render(
      
            <RootComponent/>
      
     ,
      document.getElementById("ex-map-app"),
    );
  };
renderApp(App);

if ((module as any).hot) {
    // Reload components
    (module as any).hot.accept("./SimpleApp.tsx", () => {
      const RootComponent = require("./SimpleApp").default;
      renderApp(RootComponent);
    })};
