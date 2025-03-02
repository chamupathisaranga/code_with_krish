import { useEffect, useState } from "react";
import { CustomerDetails } from "../components/CustomerDetails"
import { CustomerForm } from "../components/CustomerForm"
import { getCustomers } from "../services/customerService";
import { toast } from "react-toastify";

export const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);


    const fetchData = () => {
        getCustomers().then(response => {
            setCustomers(response.data);
        }).catch(error => {
            toast.error(error.message);
        })

    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <h3 className="title">Create Customer</h3>
            <CustomerForm loadCustomers={fetchData} />
            <CustomerDetails customers={customers} />
        </div>
    )
}