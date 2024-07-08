import { Middleware } from "@reduxjs/toolkit";

/** 
 * Define a custom middleware to record dispatched actions for testing purposes.
 **/
export const recordActionsMiddleware = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actions: any[] = []; // This will hold all dispatched actions
  const middleware: Middleware = () => next => action => {
    actions.push(action);
    return next(action);
  };
  return { middleware, actions };
};
