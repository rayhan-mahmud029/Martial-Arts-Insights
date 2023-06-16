import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const useClasses = () => {
    const { user, loading } = useContext(AuthContext);


    // query for classes data
    const { refetch, data: classes = [], error } = useQuery(['classes'], async () => {
        try {
            const response = await axios.get('http://localhost:5000/classes', {
                params: {
                    sortField: 'enrolledStudents',
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
    return [classes, refetch];
}

export default useClasses;
