import { ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from '../actions/accounts_actions';
import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../actions/expenses_actions';
import updateLocalStorage from './updateLocalStorage'
import { deleteFromExpensesDelete, deleteFromExpensesUpdate } from './helpers'
export default (state = {}, action) => {
    Object.freeze(state);
    let nextState = { ...state }
    
    switch (action.type) {
        case ADD_ACCOUNT:
            nextState[action.account.id] = action.account;
            updateLocalStorage('accounts', nextState);
            return nextState;
        case UPDATE_ACCOUNT:
            nextState[action.account.id] = action.account;
            updateLocalStorage('accounts', nextState);
            return nextState;
        case DELETE_ACCOUNT:
            delete nextState[action.account.id];
            updateLocalStorage('accounts', nextState);
            return nextState;
        
        
        
        case ADD_EXPENSE:
            nextState[action.expense.accountId].expenses.push(action.expense.id)
            updateLocalStorage('accounts', nextState);
            return nextState;
        case DELETE_EXPENSE:
            nextState = deleteFromExpensesDelete(action,nextState, 'accountId');
            updateLocalStorage('accounts', nextState);
            return nextState;
        case UPDATE_EXPENSE:
            if(action.payload.newExpense.accountId === action.payload.oldExpense.accountId){
                return nextState;
            }else{
                nextState = deleteFromExpensesUpdate(action,nextState, 'accountId');
                nextState[action.payload.newExpense.accountId].expenses.push(action.payload.newExpense.id);
                updateLocalStorage('accounts', nextState);
                return nextState;
            }
        default:
            return state;
    }
};