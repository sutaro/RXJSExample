import * as Rx from "rx";
import AuthorRequestStore from "./AuthorRequestStore";
import {IAuthorFormActions} from "../components/actions/AuthorFormActions";
import Action from "../Shared/Action";
import {AuthorRequest, IAuthorRequest} from "../models/AuthorRequest";

const onNext = Rx.ReactiveTest.onNext;

describe('AuthorRequestStore',()=>{
  let scheduler: Rx.TestScheduler;

  beforeEach(()=>{
    scheduler = new Rx.TestScheduler();

  });
  function createBreadcrumbsStore(authorFormActions:IAuthorFormActions) {
    return new AuthorRequestStore(authorFormActions);
  }
  describe('getAuthorRequest', ()=> {
    let selectedAuthorActions:IAuthorFormActions;
    beforeEach(()=>{
      selectedAuthorActions = {
        selectedFirstName: Action.create<{}>("TEST AuthorFormActions.selectedFirstName"),
        selectedLastName: Action.create<{}>("TEST AuthorFormActions.selectedLastName ")
      } as IAuthorFormActions;
    });
    function createAuthorRequestStore(selectedAuthorActions:IAuthorFormActions){
      return new AuthorRequestStore(selectedAuthorActions);
    }
    it('should emit a author request when the first name is received',()=>{
      const expectedRequest = new AuthorRequest("Simon", "Hanson");

      const observer = scheduler.createObserver();
      createAuthorRequestStore(selectedAuthorActions).getAuthorRequest().subscribe(observer);
      scheduler.scheduleRelative( 2000, () => {
        selectedAuthorActions.selectedFirstName.onNext("Simon");
        selectedAuthorActions.selectedLastName.onNext("Hanson");
        return null;
      });
      scheduler.start();

      const lastMessage = observer.messages[observer.messages.length - 1];
      expect(lastMessage.time).toEqual(2000);
      const actualRequest: IAuthorRequest = lastMessage.value.value;
      expect(actualRequest).toEqual(expectedRequest);
    });
  });
});