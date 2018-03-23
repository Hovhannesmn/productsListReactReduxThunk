import React, {Component} from 'react';
import {connect} from 'react-redux';
import removeWishList from '../actions/removeWishList';
import buyBroduct from '../actions/buyBroduct';
import {Link} from 'react-router-dom';

class WishList extends Component {
    removeFromCard = (e) => this.props.dispatch(removeWishList(e.target.value));


    buyProduct = (e) => this.props.dispatch(buyBroduct(e.target.value, this.props.balance));

    showProducts = (products, filterBy, loading, searching, wishList, error) => {
        if (loading) {
            return <div className='ui active centered inline loader' />;

        }
        if (searching) {
            return <div className='ui active centered inline loader' />;
        }
        if (error) {
            alert(error);
        }

        return (products || [])
            .filter( item => wishList.includes(item.id.toString()))
            .map((val, key) => (
                <div key={val.id} className="padding-15px" >
                    <div className="blockStyleProduct">
                        <h6>{val.title}</h6>
                        <div className="flex">
                            <span>userId : {val.userId}</span>
                            <span>Date   :  {new Date(val.ts).toDateString()}</span>
                        </div>
                        <div className="textBoxProduct">{val.body}</div>

                        <div id="price" className = "quantity-top">
                            Price : {val.price} $
                        </div>
                        <div className="textBoxProduct">
                            <button value={val.id} onClick={this.removeFromCard.bind(this)} className="removeCard">Remove From Card</button>
                            <button value={val.id} onClick={this.buyProduct.bind(this)} className="buynow">Buy Now</button>
                        </div>
                    </div>
                </div>
            )
        );
    };

    render() {
        const {searching, loading, products, filterBy, wishList, error}  = this.props;
        return (
            <div className="content">
                <div className="leftPart left">
                    <Link to={'/'}> Go Back </Link>
                </div>
                <div className="center left ">
                    <h2 className="padding-15px top_minus">Wish List</h2>
                    {this.showProducts(products, filterBy, loading, searching, wishList, error)}
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        products       : state.dataReducer.data,
        loading        : state.dataReducer.loading,
        balance        : state.dataReducer.balance,
        error          : state.dataReducer.error,

        filterBy       : state.filterReducer.filter,

        wishList       : state.wishList.wishList

    };
};

export default connect(mapStateToProps)(WishList);