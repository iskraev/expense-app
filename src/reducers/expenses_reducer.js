import { DELETE_ACCOUNT } from '../actions/accounts_actions';
import { DELETE_CATEGORY } from '../actions/categories_actions';
import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../actions/expenses_actions';
import updateLocalStorage from './updateLocalStorage'
export default (state = {}, action) => {
    Object.freeze(state);
    let nextState = { ...state }
    switch (action.type) {
        case ADD_EXPENSE:
            nextState[action.expense.id] = action.expense;
            updateLocalStorage('expenses', nextState);
            return nextState;
        case UPDATE_EXPENSE:
            nextState[action.payload.oldExpense.id] = action.payload.newExpense;
            updateLocalStorage('expenses', nextState);
            return nextState;
        case DELETE_EXPENSE:
            delete nextState[action.expense.id];
            updateLocalStorage('expenses', nextState);
            return nextState;

        case DELETE_ACCOUNT:
            action.account.expenses.forEach(expenseId => {
                delete nextState[expenseId];
            })
            updateLocalStorage('expenses', nextState);
            return nextState;
        case DELETE_CATEGORY:
            Object.values(nextState).forEach(expense => {
                expense.categoryId = 'none';
            })
            updateLocalStorage('expenses', nextState);
            return nextState;
        default:
            return state;
    }
};