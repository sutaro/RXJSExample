import {IAuthor} from "../../models/author";
import AuthorList, {IAuthorListProps} from "./authorList";

"use strict";
import * as React from 'react';
import {Link} from "react-router-dom";
import {IStores} from "../../compose";

export interface IAuthorProps {
  stores: IStores;
}

export interface IAuthorState {
  authorListProps: IAuthorListProps;
}

export class AuthorPage extends React.Component<IAuthorProps, IAuthorState> {
  private subscriptions: Rx.Disposable[];

  constructor(props: IAuthorProps) {
    super(props);
    this.subscriptions = [];
    this.state = {
      authorListProps: {authors: []}
    };
  }

  componentDidMount() {
    const authorListsPropsObservable: Rx.Observable<IAuthorListProps> = this.props.stores.users.getAuthors()
      .map(authors => {
        return {authors: authors}
      });

    const state: Rx.Observable<IAuthorState> = authorListsPropsObservable
      .map(authorListsProps => {
        return {authorListProps: authorListsProps}
      });
    this.subscriptions.push(state.subscribe(s => this.setState(s)));

  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.dispose());
    this.subscriptions = [];

  }

  render(): JSX.Element {
    return <div>
      <h1>Authors</h1>
      <Link to="addAuthor" className="btn btn-default">Add Author</Link>
      <AuthorList {...this.state.authorListProps}/>
    </div>;
  }
};

export default AuthorPage;