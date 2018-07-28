import {IAuthor} from "../models/author";
import {IAuthorFormActions} from "../components/actions/AuthorFormActions";
import {IAuthorRequest} from "../models/AuthorRequest";

export interface IAuthorRequestStore {
  getAuthorRequest(): Rx.Observable<IAuthorRequest>;
}

export class AuthorRequestStore implements IAuthorRequestStore {
  private author: Rx.Observable<IAuthorRequest>;

  constructor(authorFormActions: IAuthorFormActions) {
    const selectedFirstName = authorFormActions.selectedFirstName;
    const selectedLastName = authorFormActions.selectedLastName;
    this.author = selectedFirstName
      .combineLatest(selectedLastName, (firstName, lastName) => {
        return {firstName: firstName, lastName: lastName} as IAuthor
      });
  }

  getAuthorRequest(): Rx.Observable<IAuthorRequest> {
    return this.author;
  }
}

export default AuthorRequestStore;