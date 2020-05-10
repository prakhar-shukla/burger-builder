import React from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import { fetchOrders } from "../../redux/actions";

class Orders extends React.Component {

    componentDidMount() {
        this.props.fetchOrders()
    }

    render() {
        const orderArray = this.props.orders.data.map((entry, i) => {
            return <Order key={entry + i} orderData={entry} />
        })
        return (
            <div>
                {this.props.orders.data.length ? orderArray :
                    this.props.orders.error ? <p>Error occurred while fetching orders</p> :
                        <Spinner />}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        orders: state.orders
    }
}

export default connect(mapStateToProps, {fetchOrders})(Orders)