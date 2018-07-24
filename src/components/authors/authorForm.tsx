"use strict";

import * as React from 'react';
import TextInput from '../common/TextInput';
import { IAuthor } from '../../models/author';

export interface IAuthorFormProps{
	author:	IAuthor,
		onSave:	React.MouseEventHandler,
		onChange: React.ChangeEventHandler,
		errors: any
}
export class AuthorForm extends React.Component<IAuthorFormProps,{}>{
	render() {
		return (
			<form>
				<h1>Manage Author</h1>
				<TextInput
					name="firstName"
					label="First Name"
					placeholder="First Name"
					value={this.props.author.firstName}
					onChange={this.props.onChange}
					error={this.props.errors.firstName} />

				<TextInput
					name="lastName"
					label="Last Name"
					placeholder="Last Name"
					value={this.props.author.lastName}
					onChange={this.props.onChange}
					error={this.props.errors.lastName} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
};

export default AuthorForm;