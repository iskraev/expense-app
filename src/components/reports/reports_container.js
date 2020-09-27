import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteExpense, receiveExpense, updateExpense } from '../../actions/expenses_actions';

import Reports from './reports'

const mapStateToProps = (state) => ({
    expenses: state.expenses,
    accounts: state.accounts,
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    createExpense: (expense) => dispatch(receiveExpense(expense)),
    updateExpense: (payload) => dispatch(updateExpense(payload)),
    deleteExpense: (expense) => dispatch(deleteExpense(expense))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reports));