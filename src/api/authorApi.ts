"use strict";
import {IAuthor} from "../models/author";

var authors = require('./authorData').authors;
var _ = require('lodash');

// This would be performed on the server in a real app. Just stubbing in.

var _generateId = function (author: IAuthor): string {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

var _clone = function (item: IAuthor) {
  return JSON.parse(JSON.stringify(item)); // return cloned copy so that the item is passed by value instead of by reference
};

export interface IAuthorApi {
  getAllAuthors(): Promise<IAuthor[]>;
  getAuthorById(id: string): Promise<IAuthor>;
  saveAuthor(author: IAuthor): Promise<IAuthor>;
  deleteAuthor(id: string):Promise<any>;
}

export class AuthorApi implements IAuthorApi {
  getAllAuthors(): Promise<IAuthor[]> {
    return Promise.resolve(_clone(authors));
  };

  getAuthorById(id: string): Promise<IAuthor> {
    var author = _.find(authors, {id: id});
    return Promise.resolve(_clone(author));
  };

  saveAuthor(author: IAuthor): Promise<IAuthor> {
    // pretend an ajax call to web api is made here
    console.log('Pretend this just saved the author to the DB via AJAX call...');

    if (author.id) {
      var existingAuthorIndex = _.indexOf(authors, _.find(authors, {id: author.id}));
      authors.splice(existingAuthorIndex, 1, author);
    } else {
      // Just simulating creation here.
      // The server would generate ids for new authors in a real app.
      // Cloning so copy returned is passed by value rather than by reference.
      author.id = _generateId(author);
      authors.push(_clone(author));
    }

    return Promise.resolve(author);
  };

  deleteAuthor(id: string):Promise<any> {
    console.log('Pretend this just deleted the author from the DB via an AJAX call...');
    return Promise.resolve(_.remove(authors, {id: id}));
  }
}

export default AuthorApi;