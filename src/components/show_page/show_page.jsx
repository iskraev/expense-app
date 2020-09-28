import React from 'react';

import { RiBankLine } from 'react-icons/ri'
import { FaMoneyBillWave } from 'react-icons/fa'
import { AiFillCreditCard } from "react-icons/ai";
import Styles from './show_page.module.scss'
import currency from 'currency.js';
import Expenses from '../expenses/expenses_show_container'

export default class AccountsPage extends React.Component {
    constructor(props) {
        super(props);

        if (props.account) {
            this.state = props.account;
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

    printExpenses() {
        const { account, expenses, categories } = this.props;
        return (
            <div className={Styles.rows}>
                <div>
                    <div>Amount</div>
                    <div>Title</div>
                    <div>Category</div>
                </div>
                {account.expenses.map(expenseId => (
                    <div>
                        <div>{currency(expenses[expenseId].amount).format()}</div>
                        <div>{expenses[expenseId].title}</div>
                        <div>{categories[expenses[expenseId].categoryId].title}</div>
                    </div>
                ))}
            </div>
        )
    }

    print(){
        const { showPage, category, account } = this.props;
        if(showPage === 'account'){
            return(
                <div className={Styles.accountTitle}>
                        <div>Account:</div>
                        <div style={{color: account.color}}>{account.title}</div>
                    </div>
            )
        }

        if(showPage === 'category'){
            return(
                <div className={Styles.accountTitle}>
                        <div>Category:</div>
                        <div style={{color: category.color}}>{category.title}</div>
                    </div>
            )
        }
    }


    render() {
        const { showPage } = this.props;
        return (
            <div>
                <div className={Styles.infoPart}>
                    
                    {this.print()}

                    {showPage === 'account' ? <div>
                        {this.printIcon()}
                    </div> : ''}
                </div>


                <hr />

                
                {showPage === 'account' ? <Expenses showPage={'accountId'}/> : ''}
                {showPage === 'category' ? <Expenses showPage={'categoryId'}/> : ''}
            </div>
        )
    }
}