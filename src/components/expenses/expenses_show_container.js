import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteExpense, receiveExpense, updateExpense } from '../../actions/expenses_actions';
import { withAlert } from 'react-alert'

import ExpensesShow from './expenses_show';

const mapStateToProps = (state, ownProps) => ({
    expenses: Object.values(state.expenses).filter(expense => expense[ownProps.showPage] === Object.values(ownProps.match.params)[0]),
    accounts: state.accounts,
    categories: state.categories,
    showPage: Object.keys(ownProps.match.params)[0]
});

const mapDispatchToProps = (dispatch) => ({
    createExpense: (expense) => dispatch(receiveExpense(expense)),
    updateExpense: (payload) => dispatch(updateExpense(payload)),
    deleteExpense: (expense) => dispatch(deleteExpense(expense))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAlert()(ExpensesShow)));