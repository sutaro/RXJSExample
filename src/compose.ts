import {IUserStore, UsersStore} from "./stores/usersStore";
import authorFormActions from "./components/actions/AuthorFormActions";
import AuthorApi from "./api/authorApi";

export interface IStores {
  users: IUserStore;
}

export interface IServices {

}
export interface IComposition {
  stores: IStores;
  services: IServices;
}
export default function compose():IComposition{
  const usersStore = new UsersStore(authorFormActions, new AuthorApi(), Rx.Scheduler.default);
  const composition: IComposition = {
    stores: {
      users: usersStore
    },
    services: {}
  };
  return composition
}





