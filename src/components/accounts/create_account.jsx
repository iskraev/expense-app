import React from 'react';
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import StylesCommon from '../common.module.scss';
import { v4 as uuidv4 } from 'uuid'

export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            color: '#000000',
            type: 'bankAccount',
            expenses: []
        }
    }

    update(input) {
        return (e) => {
            this.setState({ [input]: e.currentTarget.value })
        }
    }

    createAccount(e){
        const { createAccount } = this.props;
        e.preventDefault();
        const newAccount = { ...this.state };
        newAccount.id = uuidv4();
        createAccount(newAccount)
    }



    render() {
        const { title, color } = this.state;
        const { cancel } = this.props;
        return (
            <div className={StylesCommon.addForm}>
                <form onSubmit={(e) => this.createAccount(e)}>
                    <div>
                        <input className={StylesCommon.colorInput} type="color" onChange={this.update('color')} value={color} />  
                        <input type="text" placeholder='New Account name' onChange={this.update('title')} value={title} />
                        <select className={StylesCommon.selectInput} onChange={this.update('type')}>
                            <option key={"bankAccount"} value="bankAccount">Bank account</option>
                            <option key={"credit"} value="credit">Credit</option>
                            <option key={"cash"} value="cash">Cash</option>
                           
                        </select>
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