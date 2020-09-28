import React from 'react';
import { FiX, FiEdit3, FiCheck, FiTrash } from 'react-icons/fi'
import { RiBankLine } from 'react-icons/ri'
import { FaMoneyBillWave } from 'react-icons/fa'
import { AiFillCreditCard } from "react-icons/ai";
import StylesCommon from '../common.module.scss';
import Styles from './accounts.module.scss';
export default class AccountItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.account.id,
            edit: false,
            showDelete: false,
            title: props.account.title,
            color: props.account.color,
            type: props.account.type
        }
    }

    printIcon() {
        const { type } = this.state;
        if (type === 'bankAccount') {
            return (
                <>
                    <RiBankLine /> Bank
                </>
            )
        }
        if (type === 'credit') {
            return (
                <>
                    <AiFillCreditCard /> Credit
                </>
            )
        }

        if (type === 'cash') {
            return (
                <>
                    <FaMoneyBillWave /> Cash
                </>
            )
        }
    }

    update(input) {
        return e => {
            this.setState({ [input]: e.currentTarget.value })
        }
    }

    updateAccount() {
        const { updateAccount, account } = this.props;
        const updatedAccount = Object.assign(account, this.state)
        delete updateAccount['edit']
        delete updateAccount['showDelete']

        this.setState({ edit: false }, () => {
            updateAccount(updatedAccount)
        })
    }

    deleteAccount(){
        const {account, deleteAccount } = this.props;
        this.setState({showDelete: false}, () => {
            deleteAccount(account)
        })
    }


    openEdit(e){
        e.stopPropagation();
        this.setState({ edit: true })
    }

    printItemOrEdit() {
        const {  edit,  title, color, type, showDelete } = this.state;
        const { account} = this.props;


        if (showDelete) {
            return (
                <div className={`${StylesCommon.singleItem} ${StylesCommon.singleItemDelete}`}>
                    Are you sure?
                    <div>
                        <button onClick={() => this.deleteAccount()}>Yes</button>
                        <button onClick={() => this.setState({showDelete: false})}>No</button>
                    </div>
                </div>
            )
        } else if (edit) {
            return (
                <div className={StylesCommon.singleItem}>
                    <div>
                        <select className={StylesCommon.selectInput} onChange={this.update('type')} value={type}>
                            <option value="bankAccount">Bank account</option>
                            <option value="credit">Credit</option>
                            <option value="cash">Cash</option>
                        </select>

                        <input style={{ color: color }} value={title} className={Styles.titleInput} onChange={this.update('title')} />

                        <input className={Styles.colorInput} type="color" onChange={this.update('color')} value={color} />
                    </div>
                    <div className={StylesCommon.editButtons}>
                        <FiTrash onClick={() => this.setState({showDelete: true})}/>
                        <FiX onClick={() => this.setState({ title: account.title, color: account.color, type: account.type, edit: false })} />
                        <FiCheck onClick={() => this.updateAccount()} />
                    </div>
                </div>
            )
        } else {
            return (
                // onClick={() => history.push(`accounts/${account.id}`)}
                <div className={StylesCommon.singleItem}>
                    <div>
                        <div className={Styles.type}>{this.printIcon()}</div>
                        <div className={Styles.title} style={{ color: account.color }}>{account.title}</div>
                    </div>
                    <div className={StylesCommon.edit}>
                        <FiEdit3 onClick={(e) => this.openEdit(e)} />
                    </div>
                </div>
            )
        }
    }


    render() {
        return (
            this.printItemOrEdit()
        )
    }
}