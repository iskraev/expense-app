export const ADD_EXPENSE = 'ADD_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';


export const receiveExpense = (expense) => {
    return ({
        type: ADD_EXPENSE,
        expense,
    });
}

export const deleteExpense = (expense) => {
    return ({
        type: DELETE_EXPENSE,
        expense,
    });
}



export const updateExpense = (payload) => {
    return ({
        type: UPDATE_EXPENSE,
        payload,
    });
}





