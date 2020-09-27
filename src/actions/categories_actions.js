export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';


export const receiveCategory = (category) => {
    return ({
        type: ADD_CATEGORY,
        category,
      });
}


export const updateCategory = (category) => {
 
    return ({
        type: UPDATE_CATEGORY,
        category,
      });
}


export const deleteCategory = (category) => {
 
    return ({
        type: DELETE_CATEGORY,
        category,
      });
}


