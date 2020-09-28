/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Styles from './footer.module.scss';

export default () => (
            <footer>
                <div className={Styles.footer}>
                    <div> 
                        <div>Created by <a target='_blank' href="https://iskrayev.com">Dias Iskrayev</a></div>
                    </div>

                    <div>
                    <a target='_blank' href="https://iskrayev.com">GitHub</a>
                    </div>

                    <div>
                    <a target='_blank' href="https://iskrayev.com">LinkedIn</a>
                    </div>
                </div>
            </footer>
)