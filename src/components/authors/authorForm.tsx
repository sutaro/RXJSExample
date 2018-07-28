"use strict";

import * as React from 'react';
import { IAuthor } from '../../models/author';
import authorFormActions from "../actions/AuthorFormActions";

export interface IAuthorFormProps{
	author:	IAuthor
}
export class AuthorForm extends React.Component<IAuthorFormProps,{}>{
	render() {
		return (
			<form>
				<h1>Manage Author</h1>

        <div>
          <label htmlFor={this.props.author.firstName}>First Name</label>
          <div className="field">
            <input type="text"
                   name={this.props.author.firstName}
                   className="form-control"
                   placeholder="First Name"
                   value={this.props.author.firstName}
                   onChange={event=> {authorFormActions.selectedFirstName.onNext(event.currentTarget.value);}}
						/>
          </div>
        </div>

				<div>
          <label htmlFor={this.props.author.lastName}>Last Name</label>
          <div className="field">
            <input type="text"
                   name={this.props.author.lastName}
                   className="form-control"
                   placeholder="Last Name"
                   value={this.props.author.lastName}
									onChange={event=> authorFormActions.selectedLastName.onNext(event.currentTarget.value)}/>
          </div>
        </div>
				<input type="button" value="Save" className="btn btn-default" onClick={()=> {authorFormActions.save.onNext(this.props.author.id)}} />
			</form>
		);
	}
};

export default AuthorForm;