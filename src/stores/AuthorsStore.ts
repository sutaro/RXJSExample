import {IAuthorFormActions} from "../components/actions/AuthorFormActions";
import {IAuthorApi} from "../api/authorApi";
import {IAuthor} from "../models/author";

export interface IAuthorsStore {
  saveAuthor(): Rx.Observable<boolean>;

  getAuthor(id: string): Rx.Observable<IAuthor>;

  getAuthors(): Rx.Observable<IAuthor[]>;
}

export class AuthorsStore implements IAuthorsStore {
  private isUserSavedSuccessfully: Rx.Observable<boolean>;

  constructor(authorFormAction: IAuthorFormActions, private authorApiService: IAuthorApi, private scheduler: Rx.IScheduler) {
    this.isUserSavedSuccessfully = authorFormAction.save
      .withLatestFrom(authorFormAction.selectedFirstName, authorFormAction.selectedLastName, (id, firstName, lastName) => {
        return {id: id, firstName: firstName, lastName: lastName}
      })
      .flatMapLatest(author => Rx.Observable.fromPromise(authorApiService.saveAuthor({
        id:author.id,
        firstName: author.firstName,
        lastName: author.lastName
      })), scheduler)
      .map(response => true);

  }

  saveAuthor(): Rx.Observable<boolean> {
    return this.isUserSavedSuccessfully;
  }

  getAuthor(id: string): Rx.Observable<IAuthor> {
    return Rx.Observable.fromPromise(this.authorApiService.getAuthorById(id));
  }

  getAuthors(): Rx.Observable<IAuthor[]> {
    return Rx.Observable.fromPromise(this.authorApiService.getAllAuthors());
  }
}

export default AuthorsStore;