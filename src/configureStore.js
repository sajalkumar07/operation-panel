import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import logger from "redux-logger";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const routersMiddleware = routerMiddleware(history);
  let middlewares;
  if (process.env.NODE_ENV === "development") {
    middlewares = [logger, sagaMiddleware, routersMiddleware];
  } else {
    middlewares = [sagaMiddleware, routersMiddleware];
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composedEnhancers
  );

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducers", () =>
      store.replaceReducer(createRootReducer(history))
    );
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
