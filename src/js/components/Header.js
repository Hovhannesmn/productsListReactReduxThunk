import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
let i = 0;

class Header extends Component {
    render() {
        console.log(`Header is render ${++i}`);

        const {count, balance} = this.props;
        return (
                <div className="header">
                    <div className="header-wrap container">
                        <div className="hm-right balance-div">
                            <h6>balance </h6>
                            <h6 className="balance">{balance}$ </h6>
                        </div>
                        <div className="hm-right">
                            <div className="nav-cart nav-cart-box">
                                <Link to={'/wish-list'}>
                                    <span className="text hidden-sm">Cart</span>
                                </Link>
                                <span className="cart-number" id="nav-cart-num">{count}</span></div>
                        </div>
                        <div className="hm-right">
                        <div className="imge"></div>
                        </div>
                        <div className="hm-middle">
                            <h1 className="ui green header" >Best Shop Site</h1>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
        return {
            count        : state.wishList.count,
            balance      : state.dataReducer.balance,
        };
};

export default connect(mapStateToProps)(Header);