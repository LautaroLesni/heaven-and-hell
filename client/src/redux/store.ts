import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userSlice from './slices/user'
import productSlice from './slices/products'
import categoriesSlice from './slices/categories'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const userPersistConfig = {
  key:'user',
  storage,
  whitelist:['user']
}


export const store = configureStore({
  reducer: {
      user: persistReducer<ReturnType<typeof userSlice>>(userPersistConfig, userSlice),
      products: productSlice,
      categories: categoriesSlice
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck:false
  })
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type Thunk = ThunkAction<
Promise<unknown>,
RootState,
unknown,
Action<unknown>
>
export const persistedStore = persistStore(store)