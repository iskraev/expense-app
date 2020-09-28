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
            title: props.category.title,
            color: props.category.color,
        }
    }

    // printIcon() {
    //     const { type } = this.state;
    //     if (type === 'bankAccount') {
    //         return (
    //             <>
    //                 <RiBankLine /> Bank
    //             </>
    //         )
    //     }
    //     if (type === 'credit') {
    //         return (
    //             <>
    //                 <AiFillCreditCard /> Credit
    //             </>
    //         )
    //     }

    //     if (type === 'cash') {
    //         return (
    //             <>
    //                 <FaMoneyBillWave /> Cash
    //             </>
    //         )
    //     }
    // }

    update(input) {
        return e => {
            this.setState({ [input]: e.currentTarget.value })
        }
    }

    updateCategory() {
        const state = this.state;
        const { updateCategory} = this.props;
        this.setState({ edit: false }, () => {
            updateCategory(state)
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

                        <input style={{ color: color }} value={title} className={Styles.titleInput} onChange={this.update('title')} />

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
                <div className={StylesCommon.singleItem} onClick={() => history.push(`categories/${category.id}`)}>
                    <div>
                        <div className={Styles.title} style={{ color: category.color }}>{category.title}</div>
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