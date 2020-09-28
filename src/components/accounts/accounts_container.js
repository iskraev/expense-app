import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAccount, receiveAccount, updateAccount } from '../../actions/accounts_actions';
import Accounts from './accounts';
import { withAlert } from 'react-alert';

const mapStateToProps = (state) => ({
    accounts: state.accounts
});

const mapDispatchToProps = (dispatch) => ({
    createAccount: (account) => dispatch(receiveAccount(account)),
    updateAccount: (account) => dispatch(updateAccount(account)),
    deleteAccount: (account) => dispatch(deleteAccount(account))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAlert()(Accounts)));