import React from 'react';
import Styles from './header.module.scss';

export default class Header extends React.Component{
    constructor(props){
        super(props);


    }

    render(){
        const { state } = this.props;
        return(
            <header>
                <div className={Styles.header}>
                    <div>
                        <a href="/">Main Dashboard</a>
                        <a href="/reports">Reports</a>
                    </div>

                    <div>
                        Hello, {state.user.username}!
                    </div>
                </div>
            </header>
        )
    }
}