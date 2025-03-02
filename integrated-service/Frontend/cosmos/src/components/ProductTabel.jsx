import React from 'react'

export const ProductTable = ({ products }) => {

    return (
        <div className="order-table">
            <h3>All Products</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Pirce</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(order => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>

                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}