import { connect } from 'react-redux';
import { deleteAccount, receiveAccount, updateAccount } from '../../actions/accounts_actions';
import AccountPage from './account_page'

const mapStateToProps = (state, ownProps) => ({
    account: state.accounts[ownProps.match.params.account],
    expenses: state.expenses,
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    createAccount: (account) => dispatch(receiveAccount(account)),
    updateAccount: (payload) => dispatch(updateAccount(payload)),
    deleteAccount: (index) => dispatch(deleteAccount(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);