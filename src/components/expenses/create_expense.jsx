import React from 'react';
import StylesCommon from '../common.module.scss';
import { v4 as uuidv4 } from 'uuid'

export default class createExpense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uuidv4(),
            amount: 0,
            title: '',
            accountId: Object.values(props.accounts)[0].id,
            categoryId: 'none',
        }
    }

    update(input) {
        return (e) => {
            this.setState({ [input]: e.currentTarget.value })
        }
    }

    createExpense(e) {
        const { createExpense } = this.props;
        e.preventDefault();
        const expense = { ...this.state };
        expense.date = Date.now()
        createExpense(expense)
    }

    printAccountsChoices() {
        const { accounts } = this.props;
        const { id } = this.state;
        return (
            <select className={StylesCommon.selectInput} onChange={this.update('accountId')} defaultValue={Object.values(accounts)[0].id}>
                {Object.values(accounts).map((account) => {
                    return <option key={`option-${account.id}-${id}`} value={account.id}>{account.title}</option>
                })}
            </select>
        )
    }


    printCategoriesChoices() {
        const { categories } = this.props;
        const { id } = this.state;
        return (
            <select className={StylesCommon.selectInput} onChange={this.update('categoryId')} defaultValue={Object.values(categories)[0]?.id}>
                {Object.values(categories).map((category) => {
                    return <option key={`option-${category.id}-${id}`} value={category.id}>{category.title}</option>
                })}
            </select>
        )
    }



    render() {
        const { title, amount } = this.state;
        const { cancel } = this.props;
        return (
            <div className={StylesCommon.addForm}>
                <form onSubmit={(e) => this.createExpense(e)}>
                    <div>
                        <input type="number" placeholder="0.00" onChange={this.update('amount')} value={amount} />
                        <input type="text" placeholder='New expense' onChange={this.update('title')} value={title} required={true} />
                        {this.printAccountsChoices()}
                        {this.printCategoriesChoices()}

                    </div>
                    <div>
                        <button onClick={cancel}>Cancel</button>
                        <button>Add</button>
                    </div>
                </form>
            </div>
        )
    }
}