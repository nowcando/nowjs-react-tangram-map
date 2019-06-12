import React from 'react';
import { MapView } from '../../src/MapView';
import ReactDOM from 'react-dom';

const App = (props: any) => {
  return (<div>
     <fieldset>
      <legend>Map1</legend>
      <MapView height={200} scene="scene.yaml" />
    </fieldset>
    <fieldset>
      <legend>Map2</legend>
      <MapView initPoint={[35.7013385, 51.3915073]} initZoom={16} height={400} scene="scene2.yaml" />
    </fieldset>
    <fieldset>
      <legend>Map3</legend>
      <MapView height={200} scene="scene.yaml" />
    </fieldset>
    </div>)
}

const renderApp = (RootComponent: any) => {
  ReactDOM.render(

    <RootComponent />

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
  })
};
