"use strict";

import * as React from 'react';
import { IAuthor } from '../../models/author';
import authorFormActions from "../actions/AuthorFormActions";

export interface IAuthorFormProps{
	author:	IAuthor,
		errors: any
}
export class AuthorForm extends React.Component<IAuthorFormProps,{}>{
	render() {
		return (
			<form>
				<h1>Manage Author</h1>

        <div className={this.props.errors && this.props.errors.firstName ?' has-error': ''}>
          <label htmlFor={this.props.author.firstName}>First Name</label>
          <div className="field">
            <input type="text"
                   name={this.props.author.firstName}
                   className="form-control"
                   placeholder="First Name"
                   ref={this.props.author.firstName}
                   value={this.props.author.firstName}
                   onChange={()=> authorFormActions.selectedFirstName.onNext(this.props.author.firstName)}/>
          </div>
        </div>

				<div className={this.props.errors && this.props.errors.lastName ?' has-error': ''}>
          <label htmlFor={this.props.author.lastName}>First Name</label>
          <div className="field">
            <input type="text"
                   name={this.props.author.lastName}
                   className="form-control"
                   placeholder="Last Name"
                   ref={this.props.author.lastName}
                   value={this.props.author.lastName}
									onChange={()=> authorFormActions.selectedLastName.onNext(this.props.author.lastName)}/>
          </div>
        </div>

				<input type="button" value="Save" className="btn btn-default" onClick={()=> authorFormActions.save.onNext({})} />
			</form>
		);
	}
};

export default AuthorForm;