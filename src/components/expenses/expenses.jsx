import React from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiX } from 'react-icons/fi'
import StylesCommon from '../common.module.scss';

import CreateExpense from './create_expense';
import ExpenseItem from './expense_item';
import Styles from './expenses.module.scss';


export default class Expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openContainer: false,
            addNew: false,
            sortByAccounts: false,
            sortByCategory: false,
            dateAsc: false,
            titleAsc: false,
            filterAccounts: "All",
            filterCategories: "All",
        }

        this.cancel = this.cancel.bind(this);
        this.createExpense = this.createExpense.bind(this);
        this.allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }

    componentDidUpdate(prevProps, prevState){
        const { expenses, alert } = this.props;
        if(Object.values(expenses).length > Object.values(prevProps.expenses).length){   
            alert.success('EXPENSE ADDED')
        }else if(Object.values(expenses).length < Object.values(prevProps.expenses).length){
            alert.success('EXPENSE DELETED')
        }
    
    }

    add(e) {
        const { accounts, alert } = this.props;

        e.stopPropagation();
        if(Object.values(accounts).length === 0){
            alert.error('Create account first')
        }else{
            this.setState({ openContainer: false, addNew: true })
        }
    }

    cancel(e) {
        e.preventDefault();
        this.setState({ addNew: false })
    }

    update(input) {
        return e => {
            this.setState({ [input]: e.currentTarget.value })
        }
    }

    createExpense(expense) {
        
        const { createExpense } = this.props;
        this.setState({ openContainer: true, addNew: false })
        createExpense(expense);
    }


    sortByTitle(array, column, listHelper, asc) {
        array.sort((a, b) => {
            let element1 = listHelper[a[column]].title.toLowerCase()
            let element2 = listHelper[b[column]].title.toLowerCase()
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

    sortByDate(array, asc) {
        array.sort((a, b) => {
            let element1 = new Date(a.date)
            let element2 = new Date(b.date)
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

    sortByDateWithTitle(array, column, list, asc) {
        array.sort((a, b) => {
            let adate = new Date(a.date);
            let bdate = new Date(b.date);
            if (list[a[column]].title === list[b[column]].title) {
                if (asc) {

                    return adate - bdate;
                } else {

                    return bdate - adate;
                }
            }
            return -1;
        })
        return array;
    }


    sort(array) {
        const { sortByAccounts, sortByCategory, dateAsc, titleAsc } = this.state;
        const { categories, accounts } = this.props;

        if (sortByAccounts) {
            array = this.sortByTitle(array, 'accountId', accounts, titleAsc);

            return this.sortByDateWithTitle(array, 'accountId', accounts, dateAsc)
        } else if (sortByCategory) {
            array = this.sortByTitle(array, 'categoryId', categories, titleAsc);
            return this.sortByDateWithTitle(array, 'categoryId', categories, dateAsc)
        } else {
            return this.sortByDate(array, dateAsc)
        }
    }


    printAllOrEdit() {
        const { addNew, openContainer } = this.state;
        const { accounts, categories } = this.props;

        if (addNew) {
            return (
                <CreateExpense createExpense={this.createExpense} cancel={this.cancel} accounts={accounts} categories={categories} />
            )
        } else {
            return (
                <div onClick={() => this.setState({ openContainer: !openContainer })}>
                    <div>My Expenses</div>
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

    printList() {
        const { expenses, deleteExpense, updateExpense, history, accounts, categories } = this.props;

        if (Object.keys(expenses).length === 0) {
            return (
                <div className={StylesCommon.emptyListItem}>
                    No Expenses
                </div>
            )
        } else {
            let prevDate = null;
            let array = this.sort(this.printFiltered(Object.values(expenses)));
            return (
                <div className={StylesCommon.mainContainerList}>
                    {array.length === 0 ? <div className={StylesCommon.emptyListItem}>No Expenses</div> : ''}
                    {array.map((expense, i) => {

                        if (i === array.length - 1) {
                            return (
                                <div key={`expense-${expense.id}`} >
                                    <ExpenseItem history={history} accounts={accounts} categories={categories} expense={expense} updateExpense={updateExpense} deleteExpense={deleteExpense} />
                                    <div className={StylesCommon.dateRow}>End of the list</div>
                                </div>
                            )
                        }

                        if (prevDate !== this.printDate(expense.date)) {

                            prevDate = this.printDate(expense.date);
                            prevDate = prevDate.split('-');
                            prevDate = `${this.allMonths[prevDate[0] - 1]} ${prevDate[1]}, ${prevDate[2]}`;


                            return (
                                <div key={`expense-${expense.id}`}>
                                    <div className={StylesCommon.dateRow}><FiChevronDown />{prevDate}<FiChevronDown /></div>
                                    <ExpenseItem  history={history} accounts={accounts} categories={categories} expense={expense} updateExpense={updateExpense} deleteExpense={deleteExpense} />
                                </div>
                            )
                        } else {
                            return <ExpenseItem key={`expense-${expense.id}`} history={history} accounts={accounts} categories={categories} expense={expense} updateExpense={updateExpense} deleteExpense={deleteExpense} />
                        }

                    })}
                </div>
            )
        }
    }

    printDate(time) {
        const date = new Date(time)
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${day}`
        }
        return `${month + '-' + day + '-' + year}`;
    }

    printAccountsChoices() {
        const { accounts } = this.props;
        return (
            <select className={StylesCommon.selectInput} onChange={this.update('filterAccounts')} defaultValue={'All'}>
                <option key={`option-all-filter-accounts`} value={'All'}>All</option>
                {Object.values(accounts).map((account) => {
                    return <option key={`option-${account.id}-filter-accounts`} value={account.id}>{account.title}</option>
                })}
            </select>
        )
    }


    printCategoriesChoices() {
        const { categories } = this.props;
        return (
            <select className={StylesCommon.selectInput} onChange={this.update('filterCategories')} defaultValue={'All'}>
                <option key={`option-all-filter-categories`} value={'All'}>All</option>
                {Object.values(categories).map((category) => {
                    return <option key={`option-${category.id}-filter`} value={category.id}>{category.title}</option>
                })}
            </select>
        )
    }


    printFiltered(array) {
        const { filterAccounts, filterCategories } = this.state;

        if (filterAccounts !== 'All') {
            array = array.filter(expense => expense.accountId === filterAccounts)
        }

        if (filterCategories !== 'All') {
            array = array.filter(expense => expense.categoryId === filterCategories)
        }
        return array;
    }

    render() {
        const { openContainer, sortByAccounts, sortByCategory, titleAsc, dateAsc } = this.state;
        return (
            <div className={`${StylesCommon.mainContainer} ${openContainer ? StylesCommon.mainContainerOpen : ''}`} >
                {this.printAllOrEdit()}

                <div className={`${StylesCommon.listHeader} ${Styles.rows}`}>
                    <div onClick={() => this.setState({ dateAsc: !dateAsc })}>Date{dateAsc ? <FiChevronDown /> : <FiChevronUp />}</div>
                    <div>Title</div>
                    <div className={sortByCategory ? Styles.highlightSort : ''} onClick={() => sortByCategory ? this.setState({ sortByAccounts: false, sortByCategory: true, titleAsc: !titleAsc }) : this.setState({ sortByAccounts: false, sortByCategory: true, titleAsc: false })}>Category{sortByCategory && titleAsc ? <FiChevronDown /> : <FiChevronUp />}</div>
                    <div className={sortByAccounts ? Styles.highlightSort : ''} onClick={() => sortByAccounts ? this.setState({ sortByAccounts: true, sortByCategory: false, titleAsc: !titleAsc }) : this.setState({ sortByAccounts: true, sortByCategory: false, titleAsc: false })}>Account{sortByAccounts && titleAsc ? <FiChevronDown /> : <FiChevronUp />}</div>
                    <div >Amount</div>
                    <div>Filter
                        {this.printAccountsChoices()}
                        {this.printCategoriesChoices()}
                    </div>
                    {sortByAccounts || sortByCategory ? <div onClick={() => this.setState({ sortByAccounts: false, sortByCategory: false, titleAsc: false, dateAsc: false })}><FiX /></div> : ''}
                </div>
                <hr />

                {this.printList()}

                <hr/>
            </div>
        )
    }
}