import React from 'react';
import { FiX, FiEdit3, FiCheck, FiTrash } from 'react-icons/fi'
import { RiBankLine } from 'react-icons/ri'
import { FaMoneyBillWave } from 'react-icons/fa'
import { AiFillCreditCard } from "react-icons/ai";
import StylesCommon from '../common.module.scss';
import Styles from './expenses.module.scss';

import currency from 'currency.js';

export default class ExpenseItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            showDelete: false,
            id: props.expense.id,
            amount: props.expense.amount,
            title: props.expense.title,
            accountId: props.expense.accountId,
            categoryId: props.expense.categoryId,
            date: props.expense.date
        }
        this.form = React.createRef();
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

    updateExpense(e) {
        e.preventDefault()
        const { updateExpense, expense } = this.props;
        const newExpense = { ...this.state };
        delete newExpense['edit']
        delete newExpense['showDelete']
        this.setState({ edit: false }, () => {
            updateExpense({ oldExpense: expense, newExpense })
        })
    }

    deleteExpense() {
        const { deleteExpense, expense } = this.props;
        this.setState({ showDelete: false }, () => {
            deleteExpense(expense)
        })
    }


    openEdit(e) {
        e.stopPropagation();
        this.setState({ edit: true })
    }



    printAccountsChoices() {
        const { accounts, expense } = this.props;
        const { accountId } = this.state;
        return (
            <select className={StylesCommon.selectInput} onChange={this.update('accountId')} defaultValue={accountId}>
                {Object.values(accounts).map(account => {
                    return <option key={`option-account-${account.id}-${expense.id}`} value={account.id}>{account.title}</option>
                })}
            </select>
        )
    }

    printCategoriesChoices() {
        const { categories, expense } = this.props;
        const { categoryId } = this.state;
        return (
            <select className={StylesCommon.selectInput} onChange={this.update('categoryId')} defaultValue={categoryId}>
                {Object.values(categories).map((category) => {
                    return <option key={`option-${category.id}-${expense.id}`} value={category.id}>{category.title}</option>
                })}
            </select>
        )
    }

    printDate(time) {
        const o_date = new Intl.DateTimeFormat(time)
        const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
        const m_date = o_date.formatToParts().reduce(f_date, {});
        return `${m_date.day + '-' + m_date.month + '-' + m_date.year}`;
    }

    printTime(time) {
        let hours = new Date(time).getHours();
        let minutes = new Date(time).getMinutes();
        let seconds = new Date(time).getSeconds();
        if (hours < 10) {
            hours = `0${hours}`
        }

        if (minutes < 10) {
            minutes = `0${minutes}`
        }

        if (seconds < 10) {
            seconds = `0${seconds}`
        }
        return `${hours}:${minutes}:${seconds}`
    }

    printItemOrEdit() {
        const { edit, title, amount, showDelete } = this.state;
        const { expense, categories, accounts } = this.props;


        if (showDelete) {
            return (
                <div className={`${StylesCommon.singleItem} ${StylesCommon.singleItemDelete}`}>
                    Are you sure?
                    <div>
                        <button onClick={() => this.deleteExpense()}>Yes</button>
                        <button onClick={() => this.setState({ showDelete: false })}>No</button>
                    </div>
                </div>
            )
        } else if (edit) {
            return (
                <form  onSubmit={(e) => this.updateExpense(e)}>
                    <div className={StylesCommon.singleItem}>
                        <div className={Styles.singleItemChange}>
                            <div className={Styles.time}>{this.printTime(expense.date)}</div>
                            <input type="text" placeholder='Edit expense' onChange={this.update('title')} value={title} required={true} maxLength={45} />
                            {this.printCategoriesChoices()}
                            {this.printAccountsChoices()}
                        $<input type="number" placeholder='0.00' onChange={this.update('amount')} value={amount} required={true} min={0} />
                        </div>
                        <div className={StylesCommon.editButtons}>
                            <FiTrash onClick={() => this.setState({ showDelete: true })} />
                            <FiX onClick={() => this.setState({ title: expense.title, color: expense.color, type: expense.type, edit: false })} />
                            <FiCheck onClick={() => this.form.current.click()} />
                            <button style={{display:'none'}} ref={this.form}></button>
                        </div>
                    </div>
                </form>
            )
        } else {
            return (
                // onClick={() => history.push(`expenses/${expense.id}`)}
                <div className={StylesCommon.singleItem} >
                    <div className={`${Styles.rows} ${Styles.rowsOfItem}`}>
                        <div className={Styles.time}>{this.printTime(expense.date)}</div>
                        <div className={Styles.title} style={{ color: expense.color }}>{expense.title}</div>
                        <div style={{ color: categories[expense.categoryId].color }}>{categories[expense.categoryId].title}</div>
                        <div style={{ color: accounts[expense.accountId].color }}>{accounts[expense.accountId].title}</div>
                        <div>{currency(expense.amount).format()}</div>
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