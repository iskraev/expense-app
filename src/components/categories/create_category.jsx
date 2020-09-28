import React from 'react';

import StylesCommon from '../common.module.scss';
import { v4 as uuidv4 } from 'uuid'

export default class CreateCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            color: '#000000',
            expenses: []
        }
    }

    update(input) {
        return (e) => {
            this.setState({ [input]: e.currentTarget.value })
        }
    }

    createCategory(e){
        const { createCategory } = this.props;
        e.preventDefault();
        const newCategory = { ...this.state };
        newCategory.id = uuidv4();
        createCategory(newCategory)
    }



    render() {
        const { title, color } = this.state;
        const { cancel } = this.props;
        return (
            <div className={StylesCommon.addForm}>
                <form onSubmit={(e) => this.createCategory(e)}>
                    <div>
                        <input className={StylesCommon.colorInput} type="color" onChange={this.update('color')} value={color} />  
                        <input type="text" placeholder='New category' onChange={this.update('title')} value={title} required={true} maxLength={45}/>
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