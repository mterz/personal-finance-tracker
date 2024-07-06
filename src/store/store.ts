import { configureStore, AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator, createAsyncThunk as reduxCreateAsyncThunk } from '@reduxjs/toolkit'
import transactionsReducer from '../features/dashboard/transactionsSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
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
