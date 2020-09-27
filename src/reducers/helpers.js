export function deleteFromExpensesDelete(action, nextState, id){
    for (let i = 0; i < nextState[action.expense[id]].expenses.length; i++) {
        if(action.expense.id === nextState[action.expense[id]].expenses[i]){
            nextState[action.expense[id]].expenses.splice(i, 1);
            break;
        }
    }
    return nextState;
}


export function deleteFromExpensesUpdate(action, nextState, id){
    for (let i = 0; i < nextState[action.payload.oldExpense[id]].expenses.length; i++) {
        if(action.payload.oldExpense.id === nextState[action.payload.oldExpense[id]].expenses[i]){
            nextState[action.payload.oldExpense[id]].expenses.splice(i, 1);
            break;
        }
    }
    return nextState;
}