import { AsyncThunkPayloadCreator, AsyncThunkOptions, AsyncThunk, createAsyncThunk as reduxCreateAsyncThunk } from "@reduxjs/toolkit";
import { store } from "./store";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: RootState;
};

export function createAsyncThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>,
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> {
  return reduxCreateAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(
    typePrefix,
    payloadCreator,
    options,
  );
}
