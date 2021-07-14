import { combineReducers } from 'redux';

import { reduce as CustomTaskListReducer } from './CustomTaskListState';

// Register your redux store under a unique namespace
export const namespace = 'chat-messages-query';

// Combine the reducers
export default combineReducers({
  customTaskList: CustomTaskListReducer
});
