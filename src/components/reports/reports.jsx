import React from 'react';
import { FiChevronDown, FiChevronUp, FiPlus, FiX } from 'react-icons/fi'
import StylesCommon from '../common.module.scss';

import CreateExpense from '../expenses/create_expense';
import ExpenseItem from '../expenses/expense_item';
import Styles from '../expenses/expenses.module.scss';
import currency from 'currency.js'
export default class Reports extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            addNew: false,
            sortByAccounts: false,
            sortByCategory: false,
            dateAsc: false,
            titleAsc: false,
            filterAccounts: "All",
            filterCategories: "All",
            all: true,
            daily: false,
            weekly: false,
            monthly: false,
            custom: false,
            start: '',
            end: '',
        }

        this.cancel = this.cancel.bind(this);
        this.createExpense = this.createExpense.bind(this);
        this.allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.daily !== prevState.daily || this.state.weekly !== prevState.weekly || this.state.monthly !== prevState.monthly) {
            const { daily, weekly, monthly, start } = this.state;
            let date = new Date(`${start} 00:00:00`);
            if (daily) {
                this.addTime('daily', date, this.printDate(date.getTime()))
            }
            if (weekly) {
                this.addTime('weekly', date, this.printDate(date.getTime()))
            }
            if (monthly) {
                this.addTime('monthly', date, this.printDate(date.getTime()))
            }
        }
    }

    add(e) {
        e.stopPropagation();
        this.setState({ addNew: true })
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
        this.setState({ addNew: false })
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
        console.log("T1", array)
        return array;
    }

    sortByDateWithTitle(array, column, list, asc) {
        array.sort((a, b) => {
            let adate = new Date(a.date)
            let bdate = new Date(b.date)
            if (list[a[column]].title === list[b[column]].title) {
                if (asc) {
                    console.log('test1')
                    return adate - bdate;
                } else {
                    console.log('test2')
                    return bdate - adate;
                }
            }
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

    calculateTotal() {
        const { expenses } = this.props;
        let total = 0
        this.sort(this.printFiltered(this.filterReports(Object.values(expenses)))).forEach(expense => total += parseFloat(expense.amount));
        return total;
    }


    printAllOrEdit() {
        const { addNew, } = this.state;
        const { accounts, categories } = this.props;

        if (addNew) {
            return (
                <CreateExpense createExpense={this.createExpense} cancel={this.cancel} accounts={accounts} categories={categories} />
            )
        } else {
            return (
                <div>
                    <div>My expenses</div>
                    <div>Total: {currency(this.calculateTotal()).format()}</div>
                    <div>
                        <div className={StylesCommon.mainContainerButtons}>
                            <div onClick={(e) => this.add(e)}><FiPlus /></div>
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
                    No expenses
                </div>
            )
        } else {
            let prevDate = null;
            return (
                <div className={`${StylesCommon.mainContainerList} ${Styles.reportList}`}>
                    {this.sort(this.printFiltered(this.filterReports(Object.values(expenses)))).map((expense, i) => {

                        if (prevDate !== this.printDate(expense.date)) {

                            prevDate = this.printDate(expense.date);
                            prevDate = prevDate.split('-');
                            prevDate = `${this.allMonths[prevDate[0] - 1]} ${prevDate[1]}, ${prevDate[2]}`;
                            return (
                                < >
                                    <div className={Styles.dateRow}><FiChevronDown />{prevDate}<FiChevronDown /></div>
                                    <ExpenseItem key={`expense-${expense.id}`} history={history} accounts={accounts} categories={categories} expense={expense} updateExpense={updateExpense} deleteExpense={deleteExpense} />
                                </>
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

    setTime(start, end) {
        if (start) {
            return `${start.getFullYear()}-${start.getMonth() + 1 < 10 ? `${0}${start.getMonth() + 1}` : start.getMonth() + 1}-${start.getDate() < 10 ? `${0}${start.getDate()}` : start.getDate()}`

        } else if (end) {
            return `${end.getFullYear()}-${end.getMonth() + 1 < 10 ? `${0}${end.getMonth() + 1}` : end.getMonth() + 1}-${end.getDate() < 10 ? `${0}${end.getDate()}` : end.getDate()}`
        }
    }

    addTime(input, start, e) {
        let end;
        if (input === 'daily') {
            end = new Date(start.getTime() + 86400 * 1000);
        }
        if (input === 'weekly') {
            end = new Date(start.getTime() + 86400 * 7 * 1000);
        }
        if (input === 'monthly') {
            end = new Date(new Date(`${e} 00:00:00`).setMonth(start.getMonth() + 1))
        }
        this.setState({ end: this.setTime(null, end) })
    }

    subtractTime(input, end, e) {
        let start;
        if (input === 'daily') {
            start = new Date(end.getTime() - 86400 * 1000);
        }
        if (input === 'weekly') {
            start = new Date(end.getTime() - 86400 * 7 * 1000);
        }
        if (input === 'monthly') {
            start = new Date(new Date(`${e} 00:00:00`).setMonth(end.getMonth() - 1))
        }
        this.setState({ start: this.setTime(start, null) })
    }

    changeStart(e) {
        let time = e.currentTarget.value;
        const { daily, monthly, weekly, custom } = this.state;
        let start = new Date(`${e.currentTarget.value} 00:00:00`);

        if (daily) {
            this.setState({ start: this.setTime(start, null) }, () => {
                this.addTime('daily', start, time)
            })
        }

        if (weekly) {
            this.setState({ start: this.setTime(start, null) }, () => {
                this.addTime('weekly', start, time)
            })
        }

        if (monthly) {
            this.setState({ start: this.setTime(start, null) }, () => {
                this.addTime('monthly', start, time)
            })
        }

        if (custom) {
            this.setState({ start: this.setTime(start, null) })
        }

    }

    changeEnd(e) {

        const { daily, monthly, weekly, custom } = this.state;
        let end = new Date(`${e.currentTarget.value} 00:00:00`);
        let time = e.currentTarget.value;
        if (daily) {
            this.setState({ end: this.setTime(null, end) }, () => {
                this.subtractTime('daily', end, time)
            })
        }

        if (weekly) {
            this.setState({ end: this.setTime(null, end) }, () => {
                this.subtractTime('weekly', end, time)
            })
        }

        if (monthly) {
            this.setState({ end: this.setTime(null, end) }, () => {
                this.subtractTime('monthly', end, time)
            })
        }

        if (custom) {
            this.setState({ end: this.setTime(null, end) })
        }

    }

    filterReports(array) {
        let { start, end, all } = this.state;

        if (all) {
            return array
        } else {
            start = new Date(`${start} 00:00:00`).getTime();
            end = new Date(`${end} 00:00:00`).getTime()
            return array.filter(expense => expense.date >= start && expense.date <= end);
        }
    }


    render() {
        console.log(this.state)
        const { sortByAccounts, sortByCategory, titleAsc, dateAsc, daily, monthly, weekly, custom, start, end, all } = this.state;
        return (
            <div className={`${Styles.reportNewExpense} ${Styles.reports}`} >
                <div className={Styles.reportsChoices}>
                    <div>
                        <div className={all ? Styles.reportsActive : ''} onClick={() => this.setState({ daily: false, weekly: false, monthly: false, custom: false, all: true })}>All</div>
                        <div className={daily ? Styles.reportsActive : ''} onClick={() => this.setState({ daily: true, weekly: false, monthly: false, custom: false, all: false })}>Daily</div>
                        <div className={weekly ? Styles.reportsActive : ''} onClick={() => this.setState({ daily: false, weekly: true, monthly: false, custom: false, all: false })}>Weekly</div>
                        <div className={monthly ? Styles.reportsActive : ''} onClick={() => this.setState({ daily: false, weekly: false, monthly: true, custom: false, all: false })}>Monthly</div>
                        <div className={custom ? Styles.reportsActive : ''} onClick={() => this.setState({ daily: false, weekly: false, monthly: false, custom: true, all: false })}>Custom</div>
                    </div>

                    {!all ? <div>
                        <div>Start: <input type="date" onChange={(e) => this.changeStart(e)} value={start} /></div>
                        <div>End: <input type="date" onChange={(e) => this.changeEnd(e)} value={end} /></div>
                    </div> : ''}
                </div>

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
            </div>
        )
    }
}