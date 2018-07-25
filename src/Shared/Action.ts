import * as Rx from "rx";
import logger from "logger";

class Action {
  static create<T>(name: string): Rx.Subject<T> {
    // log = (type: any, data?: any) => logger.log("ACTION Event", { name: name, type: type, data: data });
    var subject = new Rx.Subject<T>();
    var observer = Rx.Observer.create<T>(
      (param: T)      => { /*log('onNext', param);*/  subject.onNext(param); },
      (error: Error)  => { /*log('onError', error);*/ subject.onError(error); },
      ()              => { /*log('onCompleted');*/    subject.onCompleted(); }
    );
    var observable = subject.share();
    return Rx.Subject.create<T>(observer, observable);
  }
}

export default Action;