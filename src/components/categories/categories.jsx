import React from 'react';
import { FiChevronDown, FiChevronUp, FiPlus } from 'react-icons/fi'
import StylesCommon from '../common.module.scss';
import CreateCategory from './create_category';
import CategoryItem from './category_item';
import Styles from './categories.module.scss'



export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openContainer: false,
            addNew: false,
            asc: true
        }

        this.cancel = this.cancel.bind(this);
        this.createCategory = this.createCategory.bind(this);
    }

    add(e) {
        e.stopPropagation();
        this.setState({ openContainer: false, addNew: true })
    }

    cancel(e) {
        e.preventDefault();
        this.setState({ addNew: false })
    }


    createCategory(category) {
        const { createCategory } = this.props;
        this.setState({ openContainer: true, addNew: false })
        createCategory(category);
    }

    sortByTitle(array, asc) {
        array.sort((a, b) => {
            let element1 = a.title.toLowerCase();
            let element2 = b.title.toLowerCase();
            if (element1 > element2) {
                if (asc) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (asc) {
                    return -1;
                } else {
                    return 1;
                }
            }
        })
        return array;
    }



    printAllOrEdit() {
        const { addNew, openContainer } = this.state;

        if (addNew) {
            return (
                <CreateCategory createCategory={this.createCategory} cancel={this.cancel} />
            )
        } else {
            return (
                <div onClick={() => this.setState({ openContainer: !openContainer })}>
                    <div>My Categories</div>
                    <div>
                        <div className={StylesCommon.mainContainerButtons}>
                            <div onClick={(e) => this.add(e)}><FiPlus /></div>
                            <div>{openContainer ? <FiChevronUp /> : <FiChevronDown />}</div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    printList() {
        const { categories, deleteCategory, updateCategory, history } = this.props;
        const { asc } = this.state;

        if (Object.values(categories).length === 0) {
            return (
                <div className={StylesCommon.emptyListItem}>
                    No Categories
                </div>
            )
        } else {
            return (
                <div className={StylesCommon.mainContainerList}>
                    {this.sortByTitle(Object.values(categories), asc).map((category) => (
                        <CategoryItem key={`category-${category.id}`} history={history} category={category} updateCategory={updateCategory} deleteCategory={deleteCategory} />
                    ))}
                </div>
            )
        }
    }

    render() {
        const { openContainer, asc } = this.state;
        return (
            <div className={`${StylesCommon.mainContainer} ${openContainer ? StylesCommon.mainContainerOpen : ''}`} >
                {this.printAllOrEdit()}

                <div className={StylesCommon.listHeader}>
                    <div className={Styles.title} onClick={() => this.setState({ asc: !asc })}>Title{asc ? <FiChevronDown /> : <FiChevronUp />}</div>
                </div>
                <hr />

                {this.printList()}
            </div>
        )
    }
}