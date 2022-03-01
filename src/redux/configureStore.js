// Redux Store
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

// Modules
import User from './modules/user';
import Chat from './modules/chat';
import Header from './modules/header';
import Util from './modules/util';
import Rank from './modules/rank';
import Point from './modules/point';

export const history = createBrowserHistory();

// export한 Reducer를 모으기
const rootReducer = combineReducers({
  user: User,
  chat: Chat,
  header: Header,
  util: Util,
  point: Point,
  rank: Rank,
  router: connectRouter(history)
});

// 미들웨어 적용
// history  넣기
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금의 환경
const env = process.env.NODE_ENV;

// Chrome Extension
// Redux devTools 설정
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 미들웨어와 리듀서를 엮어 store 생성
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
