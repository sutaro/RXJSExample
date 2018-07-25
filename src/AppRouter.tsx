import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import App from "./components/App";
import * as React from 'react';
import {AboutPage} from './components/about/AboutPage';
import {ManageAuthorPage} from './components/authors/manageAuthorPage';
import {AuthorPage} from './components/authors/authorPage';
import {NotFoundPage} from './components/NotFoundPage';
import compose from "./compose";

export const AppRouter: React.StatelessComponent<{}> = () => {
  const composition = compose();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/authors" exact component={() => <AuthorPage stores={composition.stores}/>}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/addAuthor" exact
               render={routeProps => <ManageAuthorPage {...routeProps} stores={composition.stores}/>}/>
        <Route path="/authors/:id"
               render={routeProps => <ManageAuthorPage {...routeProps} stores={composition.stores}/>}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </BrowserRouter>
  );
}