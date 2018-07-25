'use strict';
import * as React from 'react';
import {IAuthor} from "../../models/author";
import {Link} from "react-router-dom";

export interface IAuthorListProps {
  authors: IAuthor[];
}

export class AuthorList extends React.Component<IAuthorListProps> {
  constructor(props: IAuthorListProps) {
    super(props);
  }

  render(): JSX.Element {
    return <div>
      <table className="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {this.props.authors.map(author =>
          <tr key={author.id}>
            <td><Link to={`authors/${author.id}`}>{author.id}</Link></td>
            <td>{author.firstName} {author.lastName}</td>
          </tr>)}
        </tbody>
      </table>
    </div>;
  }
};

export default AuthorList;