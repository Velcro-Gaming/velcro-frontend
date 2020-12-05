import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import RootReducer from './reducers/RootReducer'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

// Exports
export { store, persistor };