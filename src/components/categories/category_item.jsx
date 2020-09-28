import React from 'react';
import { FiX, FiEdit3, FiCheck, FiTrash } from 'react-icons/fi'

import StylesCommon from '../common.module.scss';
import Styles from './categories.module.scss';
export default class CategoryItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            showDelete: false,
            id: props.category.id,
            title: props.category.title,
            color: props.category.color,
        }
    }

   
    update(input) {
        return e => {
            this.setState({ [input]: e.currentTarget.value })
        }
    }

    updateCategory() {
        const { updateCategory, category, alert} = this.props;
        const updatedCategory = Object.assign(category, this.state)
        delete updatedCategory['edit']
        delete updatedCategory['showDelete']
        this.setState({ edit: false }, () => {
            updateCategory(updatedCategory)
            alert.success("CATEGORY UPDATED")
        })
    }

    deleteCategory(){
        const {category, deleteCategory } = this.props;
        this.setState({showDelete: false}, () => {
            deleteCategory(category)
        })
    }


    openEdit(e){
        e.stopPropagation();
        this.setState({ edit: true })
    }

    printItemOrEdit() {
        const {  edit,  title, color, showDelete } = this.state;
        const { category, history} = this.props;


        if (showDelete) {
            return (
                <div className={`${StylesCommon.singleItem} ${StylesCommon.singleItemDelete}`}>
                    Are you sure?
                    <div>
                        <button onClick={() => this.deleteCategory()}>Yes</button>
                        <button onClick={() => this.setState({showDelete: false})}>No</button>
                    </div>
                </div>
            )
        } else if (edit) {
            return (
                <div className={StylesCommon.singleItem}>
                    <div>

                        {category.id === 'none' ? <div style={{ color: color }}className={Styles.titleInput} >{title}</div> : <input style={{ color: color }} maxLength={45} value={title} className={Styles.titleInput} onChange={this.update('title')} />}

                        <input className={Styles.colorInput} type="color" onChange={this.update('color')} value={color} />
                    </div>
                    <div className={StylesCommon.editButtons}>
                        {category.id !== 'none' ? <FiTrash onClick={() => this.setState({showDelete: true})}/> : ''}
                        <FiX onClick={() => this.setState({ title: category.title, color: category.color, edit: false })} />
                        <FiCheck onClick={() => this.updateCategory()} />
                    </div>
                </div>
            )
        } else {
            return (
                
                <div className={StylesCommon.singleItem} >
                    <div>
                        <div className={Styles.title} style={{ color: category.color }} onClick={() => history.push(`categories/${category.id}`)}>{category.title}</div>
                    </div>
                    <div className={StylesCommon.edit}>
                        <FiEdit3 onClick={(e) => this.openEdit(e)} />
                    </div>
                </div>
            )
        }
    }


    render() {
        return (
            this.printItemOrEdit()
        )
    }
}