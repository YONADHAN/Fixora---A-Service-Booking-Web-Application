import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import { useDispatch } from 'react-redux'
import customerReducer from './slices/customer.slice'
import adminReducer from './slices/admin.slice'
import vendorReducer from './slices/vendor.slice'

const rootPersistConfig = {
  key: 'session',
  storage,
}

const rootReducer = combineReducers({
  customer: customerReducer,
  vendor: vendorReducer,
  admin: adminReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
