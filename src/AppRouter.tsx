import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import App from "./components/App";
import * as React from 'react';
import compose from "./compose";
import AboutPage from "./components/about/AboutPage";
import AddAuthorPage from "./components/authors/addAuthorPage";
import EditAuthorPage from "./components/authors/editAuthorPage";
import AuthorPage from "./components/authors/authorPage";
import NotFoundPage from "./components/NotFoundPage";

export const AppRouter: React.StatelessComponent<{}> = () => {
  const composition = compose();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/authors" exact component={() => <AuthorPage stores={composition.stores}/>}/>
        <Route path="/about" component={AboutPage}/>
        <Route path="/author" exact
               render={routeProps => <AddAuthorPage {...routeProps} stores={composition.stores}/>}/>
        <Route path="/author/:id"
               render={routeProps => <EditAuthorPage {...routeProps} stores={composition.stores}/>}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </BrowserRouter>
  );
}