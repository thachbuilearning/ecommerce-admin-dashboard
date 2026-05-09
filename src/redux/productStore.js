// productStore.js for productReducer
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import productReducer from "./productRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const productPersistConfig = {
    key: "product",
    version: 1,
    storage,
};

const persistedProductReducer = persistReducer(productPersistConfig, productReducer);

export const productStore = configureStore({
    reducer: persistedProductReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(thunk),
});

export const productPersistor = persistStore(productStore);
