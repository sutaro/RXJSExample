"use strict";

import * as React from 'react';
import AuthorForm from './authorForm';
import {IStores} from "../../compose";
import {RouteComponentProps} from "react-router";
import {IAuthor} from "../../models/author";

var toastr = require('toastr');

export interface IEditAuthorPageState {
  author: IAuthor;
}

export interface IEditAuthorPageProps extends RouteComponentProps<any> {
  stores: IStores;
}

export class EditAuthorPage extends React.Component<IEditAuthorPageProps, IEditAuthorPageState> {
  private subscriptions: Rx.Disposable[];

  constructor(props: IEditAuthorPageProps) {
    super(props);
    this.subscriptions = [];
    this.state = {author: {id: "0", firstName: '', lastName: ''}};
  }

  componentWillMount() {
    let state: Rx.Observable<IEditAuthorPageState>;

    var authorId = this.props.match.params.id; //from the path '/author:id'
    state = this.props.stores.authors.getAuthor(authorId)
     // .merge(this.props.stores.authors.getAuthor(authorId))
      .map((author) => {
        return {author: author}
      });

    this.subscriptions.push(state.subscribe(s => this.setState(s)));
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.dispose());
    this.subscriptions = [];
  }


  saveAuthor(event: any) {
    event.preventDefault();
    toastr.success('Author saved.');
  }

  render(): JSX.Element {
    return (
      <AuthorForm
        author={this.state.author}
      />
    );
  }
};

export default EditAuthorPage;