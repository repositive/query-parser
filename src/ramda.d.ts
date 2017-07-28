import {Lens} from 'ramda';

declare module 'ramda' {
  interface Static {
    __: any;
    view<O, T>(l: Lens): (o: T) => T;
  }
}
