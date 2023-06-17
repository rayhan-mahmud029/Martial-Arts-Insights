import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const usePaidClasses = () => {
    const { user, loading } = useContext(AuthContext);


    // query for enrolled class data
    const { refetch, data: paidClasses = [], error } = useQuery(['paidClasses'], async () => {
        try {
            const response = await axios.get(`https://martial-arts-insights-server.vercel.app/payments?email=${user?.email}`, {
                params: {
                    sortField: 'paymentTime',
                    sortOrder: 'dsc',
                },
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            return response.data;
        } catch (error) {
            throw new Error('Error fetching data');
        }
    });
    return [paidClasses, refetch]
}

export default usePaidClasses;
