/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Styles from './landing.module.scss';

export default () => (
    <div className={Styles.landing}>
        <div>
            Welcome to Exp-Manager!
            Where you can manage all of your expenses with ease!
        This project is a challenge from #CareerHack with <span className={Styles.mint}>@Mintbean</span> and was built in 2 days!
        </div>
        <div><a href="/dashboard">Start managing!</a></div>
    </div>
)