export default (state = {}, action) => {
    Object.freeze(state);
    let nextState = { ...state }
    switch (action.type) {
        // case RECEIVE_PIECES:
        //     return action.pieces;
        default:
            return state;
    }
};