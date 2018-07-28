import authorFormActions from "./components/actions/AuthorFormActions";
import AuthorApi from "./api/authorApi";
import {default as AuthorsStore, IAuthorsStore} from "./stores/AuthorsStore";
import {default as AuthorRequestStore, IAuthorRequestStore} from "./stores/AuthorRequestStore";

export interface IStores {
  authors: IAuthorsStore;
  authorRequests: IAuthorRequestStore;
}

export interface IServices {
}

export interface IComposition {
  stores: IStores;
  services: IServices;
}

export default function compose(): IComposition {
  const authorRequests = new AuthorRequestStore(authorFormActions);
  const authorsStore = new AuthorsStore(authorFormActions, new AuthorApi(), Rx.Scheduler.default);
  const composition: IComposition = {
    stores: {
      authors: authorsStore,
      authorRequests: authorRequests
    },
    services: {}
  };
  return composition
}





