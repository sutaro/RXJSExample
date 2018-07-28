export interface IAuthorRequest {
  firstName: string;
  lastName: string;
}

export class AuthorRequest implements IAuthorRequest {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}