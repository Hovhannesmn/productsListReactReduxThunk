import React, {Component} from 'react';
import {connect} from 'react-redux';
import allCategories from '../dataSource/categories';
import Filter from './Filters';
import ShowProductItem from './ShowProductItem';
import addWishList from '../actions/addWishList';
import removeWishList from '../actions/removeWishList';


class Products extends Component {
    addToCard = (e) => {
        let elem = e.target;
        let next = elem.nextSibling;

        next.disabled = !next.disabled;
        elem.disabled = !elem.disabled;

        this.props.dispatch(addWishList(elem.value));
    };

    removeFromCard = (e) => {
        let elem = e.target;
        let prev = elem.previousSibling;

        prev.disabled = !prev.disabled;
        elem.disabled = !elem.disabled;
        this.props.dispatch(removeWishList(elem.value, false));
    };

    showProducts = (products, filterBy, loading, searching, wishList) => {
        if (loading) {
            return <div className='ui active centered inline loader' />;

        }
        if (searching) {
            return <div className='ui active centered inline loader' />;

        }

        return (products || []).filter( (item) => {
            if (filterBy.length < 1) {
                return true;
            }
            let bool = true;
            Object.keys(filterBy).forEach((key) => {
                if(key === "category" && item.categoryId.toString() !== filterBy.category) {
                    bool = false;
                }
                if(key === "date" && item.ts.toString() !== filterBy.date) {
                    bool = false;
                }

            });

            return bool;
        }).map((val, key) => (
                <div key={val.id} className="col-4">
                    <div className="blockStyle">
                        <h6>{val.title}</h6>
                        <div className="flex">
                            <span>userId : {val.userId}</span>
                            <span value={val.categoryId}>category : {allCategories[val.categoryId]}</span>
                            <span>Date   :  {new Date(val.ts).toDateString()}</span>
                        </div>
                        <div className="textBox ">{val.body}</div>
                        <div className="aliceblues">
                            price : {val.price} $
                        </div>

                        <button className={!wishList.includes(val.id.toString())? "products_add_to_card" : 'products_add_to_card_disabled'}
                                value ={val.id} disabled={wishList.includes(val.id.toString())}
                                onClick={this.addToCard}>ADD TO CART
                        </button>
                        <button className={wishList.includes(val.id.toString())? "products_remove_to_card" : 'products_card_disabled'}
                                value ={val.id}
                                disabled={!wishList.includes(val.id.toString())}
                                onClick={this.removeFromCard}>Remove From CART
                        </button>
                    </div>
                </div>
            )
        );
    };

    render() {
        const {searching, loading, products, filterBy, wishList}  = this.props;
        return (
            <div className="content">
                <div className="leftPart left">
                  <Filter/>
                </div>
                <div className="center left">
                    <h3>Available Products</h3>
                    {this.showProducts(products, filterBy, loading, searching, wishList)}
                </div>
                <ShowProductItem/>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        products       : state.dataReducer.data,
        loading        : state.dataReducer.loading,
        loaded         : state.dataReducer.loaded,
        error          : state.dataReducer.error,

        searching      : state.filterReducer.loading,
        filterBy       : state.filterReducer.filter,

        wishList       : state.wishList.wishList

    };
};

export default connect(mapStateToProps)(Products);