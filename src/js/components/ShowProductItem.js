import React, {Component} from 'react';
import {connect} from 'react-redux';
import removeWishList from '../actions/removeWishList';
import buyBroduct from '../actions/buyBroduct';
import {getBody, getId, getPrice, getTitle, getTs, getUserId} from "../selector/showProductSelector";


class ShowProductItem extends Component {
    constructor(props) {
        super(props);

        this.getCurrentProduct = this.getCurrentProduct.bind(this);
        this.buyProduct = this.buyProduct.bind(this);
        this.removeFromCard = this.removeFromCard.bind(this);
    }

    getCurrentProduct = () => {
        if (!this.props.productId ) return false;

        const {productId, price, title, time, body, userId} = this.props;

        return (
                <div key={productId} className="aa">
                    <div className="blockStyleProduct">
                        <h6>{title}</h6>
                        <div className="flex">
                            <span>userId : {userId}</span>
                            <span>Date   :  {new Date(time).toDateString()}</span>
                        </div>
                        <div className="textBoxProduct">{body}</div>

                        <div id="price" className = "quantity-top">
                            Price : {price} $
                        </div>
                        <div className="textBoxProduct">
                            <button onClick={this.removeFromCard.bind(this)} className="removeCard">Remove From Card</button>
                            <button value={productId} onClick={this.buyProduct} className="buynow">Buy Now</button>
                        </div>
                    </div>
                </div>
            );
    };

    buyProduct = (e) => this.props.dispatch(buyBroduct(e.target.value,  this.props.price));

    removeFromCard = (e) => {
        let id = this.props.productId;
        if (id === -1) {
            return false
        }
        this.props.dispatch(removeWishList(id));
    };

    render() {
        return (
            <div className="rightPart">
                <h3> Buy Now </h3>
                {this.getCurrentProduct()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productId   : getId(state),
        price       : getPrice(state),
        title       : getTitle(state),
        time        : getTs(state),
        userId      : getUserId(state),
        body        : getBody(state)
    };

};

export default connect(mapStateToProps)(ShowProductItem);