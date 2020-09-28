import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAccount, receiveAccount, updateAccount } from '../../actions/accounts_actions';
import ShowPage from './show_page'

const mapStateToProps = (state, ownProps) => ({
    account: state.accounts[ownProps.match.params.account],
    category: state.categories[ownProps.match.params.category],
    expenses: state.expenses,
    categories: state.categories,
    showPage: Object.keys(ownProps.match.params)[0]
});

const mapDispatchToProps = (dispatch) => ({
    createAccount: (account) => dispatch(receiveAccount(account)),
    updateAccount: (payload) => dispatch(updateAccount(payload)),
    deleteAccount: (index) => dispatch(deleteAccount(index))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowPage))