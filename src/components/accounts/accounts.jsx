import React from 'react';
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import StylesCommon from '../common.module.scss';
import CreateAccount from './create_account';
import AccountItem from './account_item';
import Styles from './accounts.module.scss';


export default class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openContainer: false,
            addNew: false,
            asc: true
        }

        this.cancel = this.cancel.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        const { accounts, alert } = this.props;
        if(Object.values(accounts).length > Object.values(prevProps.accounts).length){   
            alert.success('ACCOUNT ADDED')
        }else if(Object.values(accounts).length < Object.values(prevProps.accounts).length){
            alert.success('ACCOUNT DELETED')
        }
    
    }

    add(e) {
        e.stopPropagation();
        this.setState({ openContainer: false, addNew: true })
    }

    cancel(e) {
        e.preventDefault();
        this.setState({ addNew: false })
    }


    createAccount(account) {
        const { createAccount } = this.props;
        this.setState({ openContainer: true, addNew: false })
        createAccount(account);
    }


    printAllOrEdit() {
        const { addNew, openContainer } = this.state;

        if (addNew) {
            return (
                <CreateAccount createAccount={this.createAccount} cancel={this.cancel} />
            )
        } else {
            return (
                <div onClick={() => this.setState({ openContainer: !openContainer })}>
                    <div>My Accounts</div>
                    <div>
                        <div className={StylesCommon.mainContainerButtons}>
                            <div onClick={(e) => this.add(e)}><FiPlus /></div>
                            <div>{openContainer ? <FiChevronUp /> : <FiChevronDown />}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }


    sortByTitle(array, asc) {
        array.sort((a, b) => {
            let element1 = a.title.toLowerCase();
            let element2 = b.title.toLowerCase();
            if (element1 > element2) {
                if (asc) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (asc) {
                    return -1;
                } else {
                    return 1;
                }
            }
        })
        return array;
    }

    printList() {
        const { accounts, deleteAccount, updateAccount, history } = this.props;
        const { asc } = this.state;

        if (Object.keys(accounts).length === 0) {
            return (
                <div className={StylesCommon.emptyListItem}>
                    No Accounts
                </div>
            )
        } else {
            let array = this.sortByTitle(Object.values(accounts), asc);
            return (
                <div className={StylesCommon.mainContainerList}>
                    {array.length === 0 ? <div className={StylesCommon.emptyListItem}>No Accounts</div> : ''}
                    {array.map((account, i) => {
                        if (array.length - 1 === i) {
                            return (
                                <div key={`account-${account.id}`}>
                                    <AccountItem  history={history} account={account} updateAccount={updateAccount} deleteAccount={deleteAccount} />

                                    <div className={StylesCommon.dateRow}>End of the list</div>
                                </div>
                            )
                        } else {
                            return <AccountItem key={`account-${account.id}`} history={history} account={account} updateAccount={updateAccount} deleteAccount={deleteAccount} />

                        }
                    })}
                </div>
            )
        }
    }

    render() {
        const { openContainer, asc } = this.state;
        return (
            <div className={`${StylesCommon.mainContainer} ${openContainer ? StylesCommon.mainContainerOpen : ''}`} >
                {this.printAllOrEdit()}

                <div className={StylesCommon.listHeader}>
                    <div className={Styles.type}>Type</div>
                    <div className={Styles.title} onClick={() => this.setState({ asc: !asc })}>Title{asc ? <FiChevronDown /> : <FiChevronUp />}</div>
                </div>
                <hr />

                {this.printList()}

                <hr/>
            </div>
        )
    }
}