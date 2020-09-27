import { combineReducers } from 'redux';
import accountsReducer from './accounts_reducer';
import expensesReducer from './expenses_reducer';
import categoriesReducer from './categories_reducer';
import userReducer from './user_reducer.js';
const rootReducer = combineReducers({
    user: userReducer,
    accounts: accountsReducer,
    categories: categoriesReducer,
    expenses: expensesReducer,
});

export default rootReducer;