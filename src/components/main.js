import React from 'react';
import Accounts from './accounts/accounts_container';
import Expenses from './expenses/expenses_container';
import Categories from './categories/categories_container';
export default () => (
    <>
        <div className='dashboard'>Dashboard</div>
        <Accounts />
        <Categories />
        <Expenses />
    </>
)