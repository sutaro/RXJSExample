"use strict";

import * as React from 'react';
import AuthorForm from './authorForm';
import {IAuthor} from '../../models/author';
import {IStores} from "../../compose";
import {RouteComponentProps} from "react-router";

var toastr = require('toastr');

export interface IAddAuthorPageState {
  author: IAuthor;
}

export interface IAddAuthorPageProps extends RouteComponentProps<any> {
  stores: IStores;
}

export class AddAuthorPage extends React.Component<IAddAuthorPageProps, IAddAuthorPageState> {
  private subscriptions: Rx.Disposable[];

  constructor(props: IAddAuthorPageProps) {
    super(props);
    this.subscriptions = [];
    this.state = {author: {id: "0", firstName: '', lastName: ''}};
  }

  componentWillMount() {
    let state: Rx.Observable<IAddAuthorPageState>;

    state = this.props.stores.authorRequests.getAuthorRequest()
      .startWith({firstName: '', lastName: ''})
      .map((author) => {
        return {author: {id: '', firstName: author.firstName, lastName: author.lastName}}
      });
    this.subscriptions.push(state.subscribe(s => this.setState(s)));

  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.dispose());
    this.subscriptions = [];
  }

  render(): JSX.Element {
    return (
      <AuthorForm
        author={this.state.author}
      />
    );
  }
};

export default AddAuthorPage;