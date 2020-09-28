import React from 'react';

import { RiBankLine } from 'react-icons/ri'
import { FaMoneyBillWave } from 'react-icons/fa'
import { AiFillCreditCard } from "react-icons/ai";
import Styles from './account_page.module.scss'
import currency from 'currency.js';


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


    render() {
        const { account } = this.props;
        return (
            <div>
                <div className={Styles.infoPart}>
                    <div className={Styles.accountTitle}>
                        Account:
                        <div>{account.title}</div>
                    </div>


                    <div>
                        {this.printIcon()}
                    </div>
                </div>


                <hr />

                {this.printExpenses()}
            </div>
        )
    }
}