import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const userPersistConfig = {
  key:'user',
  storage,
  whitelist:['id','username']
}


export const store = configureStore({
  reducer: {
      user: persistReducer<ReturnType<typeof userSlice>>(userPersistConfig, userSlice),
  },
  middleware: (defaultMiddleware) => defaultMiddleware({
    serializableCheck:false
  })
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export const persistedStore = persistStore(store)