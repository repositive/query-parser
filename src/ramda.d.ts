import * as R from 'ramda';

declare module 'ramda' {
  interface Static {
    __: any;
  }
}
