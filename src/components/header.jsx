import React from 'react';
import Styles from './header.module.scss';

export default class Header extends React.Component{
    render(){
        const { state } = this.props;
        return(
            <header>
                <div className={Styles.header}>
                    <div>
                        <a href="/"><img src="./dollar.png" alt='dollar'/></a>
                        <a href="/dashboard">Dashboard</a>
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