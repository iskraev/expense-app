import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteCategory, receiveCategory, updateCategory } from '../../actions/categories_actions';
import Categories from './categories'

const mapStateToProps = (state) => ({
    categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    createCategory: (category) => dispatch(receiveCategory(category)),
    updateCategory: (category) => dispatch(updateCategory(category)),
    deleteCategory: (category) => dispatch(deleteCategory(category))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));