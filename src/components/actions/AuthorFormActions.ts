import Action from "../../Shared/Action";
import * as Rx from 'rx';

export interface IAuthorFormActions {
  selectedFirstName: Rx.Subject<string>;
  selectedLastName: Rx.Subject<string>;
  save: Rx.Subject<string>;
}

const authorFormActions: IAuthorFormActions = {
  selectedFirstName: Action.create<string>("IAuthorFormActions.selectedFirstName"),
  selectedLastName: Action.create<string>("IAuthorFormActions.selectedLastName"),
  save: Action.create<string>("IAuthorFormActions.save")
};

export default authorFormActions;