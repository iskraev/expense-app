import { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../actions/categories_actions';
import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../actions/expenses_actions';
import updateLocalStorage from './updateLocalStorage';
import { deleteFromExpensesDelete, deleteFromExpensesUpdate } from './helpers'
import { DELETE_ACCOUNT } from '../actions/accounts_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    let nextState = { ...state }
    

    switch (action.type) {
        case ADD_CATEGORY:
            nextState[action.category.id] = action.category;
            updateLocalStorage('categories', nextState);
            return nextState;
        case UPDATE_CATEGORY:
            nextState[action.category.id] = action.category;
            updateLocalStorage('categories', nextState);
            return nextState;
        case DELETE_CATEGORY:
            delete nextState[action.category.id];
            updateLocalStorage('categories', nextState);
            return nextState;
        
        
        
        case ADD_EXPENSE:
            if(action.expense.categoryId){
                nextState[action.expense.categoryId].expenses.push(action.expense.id)
                updateLocalStorage('categories', nextState);
            }
            
            return nextState;
        case DELETE_EXPENSE:
            nextState = deleteFromExpensesDelete(action, nextState, 'categoryId');
            updateLocalStorage('categories', nextState);
            return nextState;
        case UPDATE_EXPENSE:
            if(action.payload.newExpense.categoryId === action.payload.oldExpense.categoryId){
                return nextState;
            }else{
                nextState = deleteFromExpensesUpdate(action, nextState, 'categoryId');
                nextState[action.payload.newExpense.categoryId].expenses.push(action.payload.newExpense.id);
                updateLocalStorage('categories', nextState);
                return nextState;
            }

        case DELETE_ACCOUNT:
            Object.values(nextState).forEach(category => {    
                category.expenses = category.expenses.filter(id => {
                    if(!action.account.expenses.includes(id)) return id;
                })
            })
            updateLocalStorage('expenses', nextState);
            return nextState;

        default:
            return state;
    }
};