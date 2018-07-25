import Action from "../../Shared/Action";
import * as Rx from 'rx';

export interface IAuthorFormActions {
  selectedFirstName: Rx.Subject<string>;
  selectedLastName: Rx.Subject<string>;
  save: Rx.Subject<{}>;
}

const authorFormActions: IAuthorFormActions = {
  selectedFirstName: Action.create<string>("IAuthorFormActions.save"),
  selectedLastName: Action.create<string>("IAuthorFormActions.save"),
  save: Action.create<{}>("IAuthorFormActions.save")
};

export default authorFormActions;