import {IAuthorFormActions} from "../components/actions/AuthorFormActions";
import {IAuthorApi} from "../api/authorApi";
import {IAuthor} from "../models/author";

export interface IUserStore {
  saveAuthor(): Rx.Observable<boolean>;
  getAuthors():Rx.Observable<IAuthor[]>;
}

export class UsersStore implements IUserStore {
  private isUserSavedSuccessfully: Rx.Observable<boolean>;

  constructor(authorFormAction: IAuthorFormActions, private authorApiService: IAuthorApi,private scheduler: Rx.IScheduler) {
    this.isUserSavedSuccessfully = authorFormAction.save
      .withLatestFrom(authorFormAction.selectedFirstName, (_, firstName) => firstName)
      .flatMapLatest(firstName => Rx.Observable.fromPromise(authorApiService.saveAuthor({firstName: firstName}as IAuthor)), scheduler)
      .map(response => true);

  }
  saveAuthor(): Rx.Observable<boolean> {
    return this.isUserSavedSuccessfully;
  }
  getAuthors(): Rx.Observable<IAuthor[]> {
    return Rx.Observable.fromPromise(this.authorApiService.getAllAuthors());
  }
}

export default UsersStore;