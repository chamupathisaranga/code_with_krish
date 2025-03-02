import { useEffect, useState } from "react"
import { ProductForm } from "../components/ProductForm"
import { ProductTable } from "../components/ProductTabel"
import { toast } from "react-toastify"
import { getProducts } from "../services/productService"

export const ProductPage = () => {
    const [products, setProducts] = useState([])

    const fetchData = () => {
        getProducts().then(response => {
            setProducts(response.data)
        }).catch(error => {
            toast.error(error.message);
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container">
            <h3 className="title">Create Product</h3>
            <ProductForm fetchData={fetchData} />
            <ProductTable products={products} />

        </div>
    )
}