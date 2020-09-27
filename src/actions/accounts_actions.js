export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';


export const receiveAccount = (account) => {
    return ({
        type: ADD_ACCOUNT,
        account,
      });
}


export const updateAccount = (account) => {
 
    return ({
        type: UPDATE_ACCOUNT,
        account,
      });
}


export const deleteAccount = (account) => {
 
    return ({
        type: DELETE_ACCOUNT,
        account,
      });
}


