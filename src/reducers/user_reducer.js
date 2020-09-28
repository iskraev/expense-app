export default (state = {}, action) => {
    Object.freeze(state);
    
    switch (action.type) {
        // case RECEIVE_PIECES:
        //     return action.pieces;
        default:
            return state;
    }
};