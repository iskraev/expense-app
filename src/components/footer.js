/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Styles from './footer.module.scss';

export default () => (
    <footer>
        <div>
            <div className={Styles.footer}>
                <div>
                    <div>Created by <a target='_blank' href="https://iskrayev.com">Dias Iskrayev</a></div>
                </div>

                <div>
                    <a target='_blank' href="https://github.com/iskraev/expense-app">GitHub</a>
                </div>

                <div>
                    <a target='_blank' href="https://www.linkedin.com/in/iskrayev/">LinkedIn</a>
                </div>
            </div>

            
        </div>
    </footer>
)