import * as React from 'react';
import './styles/App.css';

import { Header } from './common/Header';
import {withRouter} from "react-router";

export const App: React.StatelessComponent<{}> =(props)=> {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          {props.children}
        </div>
      </div>
    );
};

export default App;///withRouter((App));