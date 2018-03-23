import React from 'react';
import {connect} from 'react-redux';
import filterProducts from '../actions/filterProducts';
import allCategories from '../dataSource/categories';

let i = 0;
class Filters extends React.Component {
    constructor(props){
        super(props);
        this.currentDate = false;
        this.currentCategory = false;
    }

    changeDateType = (date) => new Date(date).toDateString();

    dateOption = (availableDates) => (
        (availableDates || []).map((item)=>(
            <option key={item} value={item} >{this.changeDateType(item)}</option>
        ))
    );

    categoryOption = (categories) => (
        (categories || []).map((item)=>(
            <option key={item} value={item} >{allCategories[item]}</option>
        ))
    );

    filterByParams = (e)=> {
        e.preventDefault();
        let filterBy = {};
        if (this.currentCategory.value !== "0") {
            filterBy.category = this.currentCategory.value;
        }
        if (this.currentDate.value !== "0") {
            filterBy.date = this.currentDate.value;
        }
        this.props.dispatch(filterProducts(filterBy));
    };

  render() {
      console.log(`Filter is render ${++i}`);
      const {availableDates, categories}  = this.props;

      return (
        <div>
            <h3>Filter Product</h3>
            <p> Filter by date </p>
            <select
                 className="selector-left-bar"
                 onChange={this.filterByParams.bind(this)}
                 ref={el => this.currentDate = el}
            >
                <option key={0} value={0}>All Dates</option>
                {this.dateOption(availableDates)}
            </select>
            <p> Filter by category </p>
            <select
                className="selector-left-bar"
                onChange={this.filterByParams.bind(this)}
                 ref={el => this.currentCategory = el}
            >
                <option key={0} value={0}>{allCategories[0]}</option>
                {this.categoryOption(categories)}
            </select>

        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        availableDates : state.dataReducer.date,
        categories     : state.dataReducer.categories,
        searching      : state.filterReducer.loading,

        filterBy       : state.filterReducer.filter

    };
};

export default connect(mapStateToProps)(Filters);
